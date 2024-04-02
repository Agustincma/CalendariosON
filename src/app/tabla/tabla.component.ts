import { Component } from '@angular/core';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent {
  tableName: string = '';
  tableData: any[] = [];

  addRow() {
    this.tableData.push({
      season: '',
      dow: 0,
      period: 0,
      startHour: '',
      endHour: '',
      opMode: 0
    });
  }

  deleteRow(index: number) {
    this.tableData.splice(index, 1);
  }

  saveTable() {
    const table = {
      name: this.tableName,
      data: this.tableData
    };
    
    const jsonData = JSON.stringify(table);
    const blob = new Blob([jsonData], { type: 'application/json' });
    
    // Utiliza el nombre de la tabla como nombre del archivo
    saveAs(blob, this.tableName + '.json');
  }
}


