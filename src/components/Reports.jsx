import React, { useState } from 'react';
import { DownloadOutlined, FileExcelOutlined, FileTextOutlined, FileJsonOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import { Table, Button, Upload, Checkbox, Select, Form, Input, message } from 'antd';

const getAllKeys = (data) => {
  if (!Array.isArray(data) || data.length === 0) return [];
  return Array.from(
    data.reduce((acc, item) => {
      Object.keys(item).forEach((key) => acc.add(key));
      return acc;
    }, new Set())
  );
};

const Reports = () => {
  const [jsonData, setJsonData] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [format, setFormat] = useState('excel');
  const [excelOptions, setExcelOptions] = useState({ headerColor: '#1890ff', boldHeader: true });
  const [showOptions, setShowOptions] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Handle file upload (JSON only for demo)
  const handleUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        setJsonData(Array.isArray(data) ? data : [data]);
        setSelectedKeys([]);
        setShowPreview(true);
      } catch (err) {
        message.error('Invalid JSON file');
      }
    };
    reader.readAsText(file);
    return false;
  };

  // Export logic
  const handleExport = () => {
    if (!selectedKeys.length) {
      message.warning('Please select at least one field to export.');
      return;
    }
    const exportData = jsonData.map((item) => {
      const obj = {};
      selectedKeys.forEach((key) => {
        obj[key] = item[key];
      });
      return obj;
    });
    if (format === 'excel') {
      const ws = XLSX.utils.json_to_sheet(exportData);
      // Excel header styling (simple, for demo)
      if (excelOptions.boldHeader || excelOptions.headerColor) {
        const range = XLSX.utils.decode_range(ws['!ref']);
        for (let C = range.s.c; C <= range.e.c; ++C) {
          const cell = ws[XLSX.utils.encode_cell({ r: 0, c: C })];
          if (cell && cell.s === undefined) cell.s = {};
          if (excelOptions.boldHeader) cell.s.font = { bold: true };
          if (excelOptions.headerColor) cell.s.fill = { fgColor: { rgb: excelOptions.headerColor.replace('#', '') } };
        }
      }
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Report');
      XLSX.writeFile(wb, 'report.xlsx');
    } else if (format === 'csv') {
      const ws = XLSX.utils.json_to_sheet(exportData);
      const csv = XLSX.utils.sheet_to_csv(ws);
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'report.csv';
      a.click();
      window.URL.revokeObjectURL(url);
    } else if (format === 'json') {
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'report.json';
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  const allKeys = getAllKeys(jsonData);

  return (
    <div>
      <h2>Dynamic Report Exporter</h2>
      <Upload beforeUpload={handleUpload} showUploadList={false} accept=".json">
        <Button icon={<FileJsonOutlined />}>Upload JSON</Button>
      </Upload>
      {showPreview && (
        <div style={{ margin: '24px 0' }}>
          <h4>Preview Data</h4>
          <Table
            dataSource={jsonData}
            columns={allKeys.map((key) => ({ title: key, dataIndex: key, key }))}
            rowKey={(row, idx) => idx}
            size="small"
            pagination={{ pageSize: 5 }}
            scroll={{ x: true }}
          />
        </div>
      )}
      {allKeys.length > 0 && (
        <div style={{ margin: '24px 0' }}>
          <h4>Select Fields to Export</h4>
          <Checkbox.Group
            options={allKeys}
            value={selectedKeys}
            onChange={setSelectedKeys}
            style={{ marginBottom: 16 }}
          />
          <div style={{ margin: '16px 0' }}>
            <span>Export Format: </span>
            <Select
              value={format}
              onChange={val => { setFormat(val); setShowOptions(val === 'excel'); }}
              style={{ width: 120 }}
              options={[
                { value: 'excel', label: (<span><FileExcelOutlined /> Excel</span>) },
                { value: 'csv', label: (<span><FileTextOutlined /> CSV</span>) },
                { value: 'json', label: (<span><FileJsonOutlined /> JSON</span>) },
              ]}
            />
          </div>
          {showOptions && (
            <div style={{ margin: '16px 0' }}>
              <h4>Excel Options</h4>
              <Form layout="inline">
                <Form.Item label="Header Color">
                  <Input type="color" value={excelOptions.headerColor} onChange={e => setExcelOptions({ ...excelOptions, headerColor: e.target.value })} />
                </Form.Item>
                <Form.Item label="Bold Header">
                  <Checkbox checked={excelOptions.boldHeader} onChange={e => setExcelOptions({ ...excelOptions, boldHeader: e.target.checked })} />
                </Form.Item>
              </Form>
            </div>
          )}
          <Button type="primary" icon={<DownloadOutlined />} onClick={handleExport} style={{ marginTop: 16 }}>
            Export
          </Button>
        </div>
      )}
    </div>
  );
};

export default Reports;
