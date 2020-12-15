import { Component, OnInit } from '@angular/core';
import { Supplier} from '../models/supplier';
import { SupplierService} from '../services/supplier.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  supplier: Supplier = {
    nombre: '',
    correo: '',
    NIT: null,
    direccion: '',
    numero: null,
    password: ''
  }
  constructor(private supplierService: SupplierService, private authService:AuthService, private router:Router) { }

  ngOnInit() {
  }
  onSubmit(){
    if(this.supplier.nombre != '' && this.supplier.correo != ''){
      this.supplierService.addSupplier(this.supplier);
      this.authService.RegisterProveedor(this.supplier.correo, this.supplier.password);
      this.supplier.nombre = '';
      this.supplier.correo = '';
      this.supplier.numero = null;
      this.supplier.NIT = null;
      this.supplier.direccion = '';
      this.supplier.password = '';
      this.router.navigateByUrl('home');
    }
  }

}
