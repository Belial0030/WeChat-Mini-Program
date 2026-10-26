package com.controller;

import com.annotation.IgnoreAuth;
import com.service.file.FileStorageApplicationService;
import com.utils.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 * 上传文件映射表
 */
@RestController
@RequestMapping("file")
@SuppressWarnings({"unchecked","rawtypes"})
public class FileController{
    @Autowired
    private FileStorageApplicationService fileStorageApplicationService;

	/**
	 * 上传文件
	 */
	@RequestMapping("/upload")
    public R upload(@RequestParam("file") MultipartFile file,String type) throws Exception{
        return fileStorageApplicationService.upload(file, type);
    }
	
	/**
	 * 下载文件
	 */
	@IgnoreAuth
	@RequestMapping("/download")
    public ResponseEntity<byte[]> download(@RequestParam String fileName){
        return fileStorageApplicationService.download(fileName);
    }
	
}
