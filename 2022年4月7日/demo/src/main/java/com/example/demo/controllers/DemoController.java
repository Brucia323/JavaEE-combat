package com.example.demo.controllers;

import cn.hutool.poi.excel.ExcelReader;
import cn.hutool.poi.excel.ExcelUtil;
import cn.hutool.poi.excel.ExcelWriter;
import com.example.demo.models.Demo;
import com.example.demo.utils.mapper.DemoMapper;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

@RestController
@RequestMapping("/api/demo")
public class DemoController {
    @Resource
    private DemoMapper demoMapper;
    
    @GetMapping()
    public ResponseEntity<List<Demo>> getDemo() {
        List<Demo> demos = demoMapper.selectList(null);
        return ResponseEntity.status(200).body(demos);
    }
    
    @PostMapping()
    public ResponseEntity<Demo> createDemo(@RequestBody Demo demo) {
        demoMapper.insert(demo);
        return ResponseEntity.status(201).body(demo);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Demo> updateDemo(@RequestBody Demo demo) {
        demoMapper.updateById(demo);
        return ResponseEntity.status(200).body(demo);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDemo(@PathVariable("id") int id) {
        demoMapper.deleteById(id);
        return ResponseEntity.status(204).build();
    }
    
    @PostMapping("/import")
    public void importDemos(MultipartFile file, HttpServletRequest request) {
        String path = request.getServletContext().getRealPath("/");
        File filePath = new File(path + "/upload");
        if (!filePath.exists()) {
            filePath.mkdirs();
        }
        String fileName = file.getOriginalFilename();
        File dest = new File(filePath, fileName);
        try {
            file.transferTo(dest);
            ExcelReader reader = ExcelUtil.getReader(dest);
            List<Demo> demos = reader.readAll(Demo.class);
            for (Demo demo : demos) {
                demoMapper.insert(demo);
            }
            dest.delete();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    /**
     * 导出excel
     *
     * @param request
     * @return
     * @throws FileNotFoundException
     * @deprecated 使用{@link #exportDemos(HttpServletResponse)}代替
     */
    public ResponseEntity<Object> exportDemos(HttpServletRequest request) throws FileNotFoundException {
        String path = request.getServletContext().getRealPath("/");
        File filePath = new File(path + "/download");
        if (!filePath.exists()) {
            filePath.mkdirs();
        }
        String fileName = "demos.xls";
        File dest = new File(filePath, fileName);
        List<Demo> demos = demoMapper.selectList(null);
        ExcelWriter writer = ExcelUtil.getWriter(dest);
        writer.write(demos, true);
        writer.close();
        File file = new File(filePath, fileName);
        InputStreamResource resource = new InputStreamResource(new FileInputStream(file));
        HttpHeaders headers = new HttpHeaders();
        headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
        headers.add("Content-Disposition", String.format("attachment; filename=\"%s\"", fileName));
        headers.add("Pragma", "no-cache");
        headers.add("Expires", "0");
        headers.add("Access-Control-Expose-Headers", "Content-Disposition");
        headers.add("content-type", "application/vnd.ms-excel;charset=UTF-8");
        ResponseEntity<Object> responseEntity = ResponseEntity.ok().headers(headers).contentLength(file.length()).contentType(MediaType.parseMediaType("application/octet-stream")).body(resource);
        file.delete();
        return responseEntity;
    }
    
    @GetMapping("/export")
    public void exportDemos(HttpServletResponse response) throws IOException {
        List<Demo> demos = demoMapper.selectList(null);
        ExcelWriter writer = ExcelUtil.getWriter(true);
        writer.write(demos, true);
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8");
        String fileName = URLEncoder.encode("用户信息", StandardCharsets.UTF_8);
        response.setHeader("Content-Disposition", "attachment;filename=" + fileName + ".xlsx");
        ServletOutputStream out = response.getOutputStream();
        writer.flush(out, true);
        out.close();
        writer.close();
    }
}
