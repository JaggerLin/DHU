// 云函数入口文件
const cloud = require('wx-server-sdk')
//图片转化成pdf 
const {
  PDFDocument
} = require('pdf-lib');
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  /*
   * 小程序端传过来的图片信息
   * width：用于指定生成PDF的宽
   * height：用于指定生成PDF的高
   * fileID：用于指定图片所在云服务器的位置
   */
  let width = event.width;
  let height = event.height;
  let fileID_img = event.fileID_img;

  // 定义pdf文档节点
  const doc = await PDFDocument.create();

  // 赋予它宽高
  let page = doc.addPage();
  page.setWidth(width);
  page.setHeight(height);
  // console.log(page)

  // 把服务器的图片下载下来
  const lenderSignSign = await cloud.downloadFile({
    fileID: fileID_img
  });
  // console.log(lenderSignSign)

  // 把Buffer格式的图片嵌入到pfd的节点中
  let img = await doc.embedPng(lenderSignSign.fileContent);
  // console.log(img)
  page.drawImage(img, {
    x: 0,
    y: 0,
    width: width,
    height: height
  });

  // 把节点转成成Base64格式
  const docBase64 = await doc.saveAsBase64()
  const docBuffer = Buffer.from(docBase64, 'base64');
  // 定义存放到云服务器的文件夹及pdf名字
  let fileName = 'wxmlToPdf-pfd/' + parseInt(new Date().getTime() / 1000) + '.pdf';

  // 把文件上传到云服务器
  let result = await cloud.uploadFile({
    cloudPath: fileName,
    fileContent: docBuffer
  });

  // pdf文件在云服务器的id
  let fileID_pdf = result.fileID;
  // console.log(fileID_pdf)

  // 换取PDF的https链接
  const fileList = await cloud.getTempFileURL({
    fileList: [fileID_pdf],
  });

  // PDF文件在云服务器上的https链接
  let pdf = fileList.fileList[0].tempFileURL;
  
  return {
    code: 1,
    msg: '执行完成',
    data: {
      fileID: fileID_pdf,
      pdf: pdf
    }
  }
}