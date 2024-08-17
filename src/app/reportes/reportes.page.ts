import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { UtileriaService } from '../services/utileria.service';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.page.html',
  styleUrls: ['./reportes.page.scss'],
})
export class ReportesPage implements OnInit {

  constructor(private firestore:FirebaseService,private util:UtileriaService) { }

  ngOnInit() {
  }
    startDate: string;
    endDate: string;
    reportGenerated = false;
    salesData: any[] = [];

 

  filteredSales = [];

  generateReport() {
    if (this.startDate && this.endDate) {
      this.firestore.getSalesByDateRange(this.startDate, this.endDate).subscribe(sales => {
        console.log("objeto sales:"+sales)
        this.salesData = sales;
        console.log("objeto salesdata:"+this.salesData)

        this.generatePDF();
      });
    }
  }

  generatePDF() {
    const doc = new jsPDF();

    // Título
    doc.text('Reporte de Ventas', 10, 10);

    // Agregar tabla con los datos de ventas
    (doc as any).autoTable({
      head: [['id', 'Ventas','Fecha']],
      body: this.salesData.map(ordenes => [ordenes.id, ordenes.total,ordenes.fecha]),
    });

    // Descargar el archivo PDF
    doc.save('reporte-ventas.pdf');
  }
  

}


