import moment from 'moment';

const COS = require('cos-js-sdk-v5');

// todo 暂定前端写死 秘钥
const cos = new COS({
  SecretId: 'AKIDjHZaLwKSJwSrAH8i1EVjpndMwvnYCkCW',
  SecretKey: 'FOQK7mKk2CCyVs6AzYpqZ1B5i37uQfcI',
});

/**
 * 按照Upload组件的规范封装
 * 上传到腾讯云 @returns 返回文件的完整路径
 * @param props 包含uploadPath(必传)、Upload组件的customRequest所有参数
 * Key --- 若传入则以传入的路径为准
 */
function cosUpload(props: any, Key?: string): string {
  const { file, uploadPath = '', onProgress, onSuccess, onError } = props;
  console.log('cccc', props, Key);
  // 调用方法
  const filePath = cos.putObject(
    {
      Bucket: 'blog-1302323720' /* 必须 */, // 存储桶
      Region: 'ap-chengdu',
      Key:
        Key ||
        `${uploadPath}${moment().valueOf()}_${
          file.name
        }` /* key值在同一路径下必须唯一，否则之前的会被覆盖 */,
      Body: file,
      StorageClass: 'STANDARD',
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onTaskReady: function (tid: string) {},
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onTaskStart: function (info: any) {},
      onProgress: function (progressData: any) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        onProgress && onProgress({ percent: progressData.percent * 100 }, file);
      },
    },
    // eslint-disable-next-line @typescript-eslint/no-shadow
    function (err: any, data: any) {
      if (err) {
        onError(err);
        return '';
      }
      console.log('上传成功', data);
      onSuccess({ data: `https://${data.Location}` }, file);
      return data && `https://${data.Location}`;
    },
  );
  return filePath;
}

/** 删除文件
 * @param
 * key -- 存储对象的唯一key值，即完整路径除出域名、端口的路径
 * filePath  -- 存储对象的完整路径，方法内自己处理获取key
 */
function cosDelete(params: { key?: string; filePath?: string }, onSuccess?: any, onError?: any) {
  let Key = '';
  if (params.key) {
    Key = params.key;
  }
  if (params.filePath) {
    const index = params.filePath.indexOf('.myqcloud.com/');
    if (index > -1) {
      Key = params.filePath.substr(index + 13);
    }
  }
  if (Key) {
    cos.deleteObject(
      {
        Bucket: 'blog-1302323720',
        Region: 'ap-chengdu',
        Key /* 必须 */,
      },
      function (err: any, data: any) {
        if (err) {
          onError(err);
          return '';
        }
        console.log('删除文件', data);
        onSuccess();
      },
    );
  } else {
    onError('腾讯云不存在该文件');
  }
}

/** 获取目录下文件 */
function cosGet(menu: string, onSuccess?: any, onError?: any) {
  cos.getBucket(
    {
      Bucket: 'blog-1302323720' /* 必须 */,
      Region: 'ap-chengdu' /* 存储桶所在地域，必须字段 */,
      Prefix: menu /* 目录（如 a/）,非必须 */,
      //  Delimiter: '/', /* 列出目录下的文件，不深度遍历,非必须 */
    },
    function (err: any, data: any) {
      console.log(' 获取目录下文件', err, data);
      if (err) {
        onError(err);
      }
      onSuccess(data);
    },
  );
}

/**
 * 下载文件
 * @param
 * key -- 存储对象的唯一key值，即完整路径除出域名、端口的路径
 * filePath  -- 存储对象的完整路径，方法内自己处理获取key
 */
async function cosDownload(params: { key?: string; filePath?: string }): Promise<string> {
  let url = '';
  if (params.key) {
    url = cos.getObjectUrl({
      Bucket: 'blog-1302323720' /* 必须 */, // Bucket 格式：test-1250000000
      Region: 'ap-chengdu',
      Key: params.key,
      Sign: false,
    });
  }
  if (params.filePath) {
    const index = params.filePath.indexOf('.myqcloud.com/');
    if (index > -1) {
      url = cos.getObjectUrl({
        Bucket: 'blog-1302323720' /* 必须 */, // Bucket 格式：test-1250000000
        Region: 'ap-chengdu',
        Key: params.filePath.substr(index + 13),
        Sign: false,
      });
    }
  }
  if (url) {
    return Promise.resolve(url);
  } else {
    return Promise.reject(new Error('腾讯云不存在该文件'));
  }
}

export default {
  cosUpload,
  cosDelete,
  cosGet,
  cosDownload,
};
