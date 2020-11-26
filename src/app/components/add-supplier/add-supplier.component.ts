import { Component, OnInit } from '@angular/core';
import { SupplierService} from '../../services/supplier.service';
import { Supplier} from '../../models/supplier';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.scss'],
})
export class AddSupplierComponent implements OnInit {
  supplier: Supplier = {
    id: '',
    nombre: '',
    correo: '',
    numero: null
  }

  constructor(private supplierService: SupplierService) { }

  ngOnInit() {
    
  }
  onSubmit(){
    if(this.supplier.nombre != '' && this.supplier.correo != ''){
      this.supplierService.addSupplier(this.supplier);
      this.supplier.nombre = '';
      this.supplier.correo = '';
      this.supplier.numero = null;
    }
  }

}
