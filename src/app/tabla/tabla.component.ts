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
  tableTariff: { [key: string]: { label: string, value: { [key: string]: number } } } = {
    GDMTH: { label: 'GDMTH', value: { verano: 1, invierno: 2 } },
    DIST: { label: 'DIST', value: { primavera: 3, verano: 4, otoño: 5, invierno: 6 } },
    DIT: { label: 'DIT', value: { primavera: 7, verano: 8, otoño: 9, invierno: 10 } }
  };
  selectedTariff: string = '';
  selectedSeason: string = '';
  // allDow: number = '';
  seasonOptions: { label: string, value: string }[] = [];
  dowOptions: { label: string, value: string }[] = [
    { label: 'Weekday', value: 'weekday' },
    { label: 'Saturday', value: 'saturday' },
    { label: 'Sunday', value: 'sunday' }
  ];
  opModes:{ label: string, value:string}[]=[
    {label: 'MDC_Charge_Reactive', value:'MDC_Charge_Reactive'},
    {label: 'MDC_Standby_Reactive', value: 'MDC_Standby_Reactive'},
    {label: 'MDC_Discharge_Reactive', value: 'MDC_Discharge_Reactive'},
    {label: 'MDC_Standby', value: 'MDC_Standby'},
    {label: 'PLPS_Charge_Reactive', value: 'PLPS_Charge_Reactive'},
  ];

  get tableTariffKeys(): string[] {
    return Object.keys(this.tableTariff);
  }

  updateSeasonOptions() {
    const selectedTariffOptions = this.tableTariff[this.selectedTariff].value;
    const seasonKeys = Object.keys(selectedTariffOptions);
    this.seasonOptions = seasonKeys.map(key => ({ label: key, value: selectedTariffOptions[key].toString() }));
  
    // Si la tarifa seleccionada es GDMTH, selecciona automáticamente la primera temporada disponible
    if (this.selectedTariff === 'GDMTH' && seasonKeys.length > 0) {
      this.selectedSeason = seasonKeys[0];
    }
  
    // Guarda los días de la semana disponibles para la tarifa seleccionada
    // this.allDow = this.dowOptions.map(dow => dow.value);
    
  }
  

  addRow() {
    this.tableData.push({
      season: '',
      dow: '',
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
      data: this.tableData,
      nameTariff: this.selectedTariff,
      // nameDow: this.allDow,
      opModes: this.opModes // Modos de operación
    };
    
    const jsonData = JSON.stringify(table);
    const blob = new Blob([jsonData], { type: 'application/json' });
    
    // Utiliza el nombre de la tabla como nombre del archivo
    saveAs(blob, this.tableName + '.json');
  }
  
}
