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
    nit: null,
    direccion: '',
    telefono: null,
    contrasena: ''
  }
  constructor(private supplierService: SupplierService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }
  onSubmit(){
    if (this.supplier.nombre !== '' && this.supplier.correo !== ''){
      this.authService.register(this.supplier).then(() => {
        this.supplier.nombre = '';
        this.supplier.correo = '';
        this.supplier.telefono = null;
        this.supplier.nit = null;
        this.supplier.direccion = '';
        this.supplier.contrasena = '';
        this.router.navigateByUrl('home');
      });
      // this.supplierService.addSupplier(this.supplier);
      // this.authService.RegisterProveedor(this.supplier.correo, this.supplier.password);
    }
  }

}
