import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ValueAccessor } from '@ionic/angular/directives/control-value-accessors/value-accessor';
import { homedir } from 'os';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-submit-form',
  templateUrl: './submit-form.page.html',
  styleUrls: ['./submit-form.page.scss'],
})
export class SubmitFormPage implements OnInit {
  amount: string;
  price: string;

  get name() {
    return this.registrationForm.get('name');
  }
  get email() {
    return this.registrationForm.get('email');
  }
  get phone() {
    return this.registrationForm.get('phone');
  }
  get contentDesc() {
    return this.registrationForm.get('description.contentDesc');
  }

  public errorMessages = {
    name: [
      { type: 'required', message: 'Debe poner el nombre del encargado' },
      { type: 'maxlength', message: 'No debe exceder los 100 caracteres' }
    ],
    email: [
      { type: 'required', message: 'Debe poner el email del encargado' },
      { type: 'pattern', message: 'Porfavor ingrese una direccion de email valida' }
    ],
    phone: [
      { type: 'required', message: 'Debe poner el telefono del encargado' },
      { type: 'pattern', message: 'Porfavor ingrese un telefono valido' }
    ],
    contentDesc: [
      { type: 'required', message: 'Debe poner una descripcion para cada item de la oferta' },
      { type: 'maxlength', message: 'No debe exceder los 300 caracteres' }
    ]
  };

  registrationForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    email: ['', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')
    ]],
    phone: ['', [
      Validators.required,
      //Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$')
      Validators.pattern('^[0-9]{8}(?:-[0-9]{4})?$')
    ]],
    description: this.formBuilder.group({
      contentDesc: ['', [Validators.required, Validators.maxLength(300)]]
    })
  });

  selectedItems = [];
  itemsOffered = [];
  total = 0;

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private authService: AuthService,
    public toastController: ToastController,
    private router: Router
    ) { }

  ngOnInit() {
    this.selectedItems = this.cartService.getCart();
    /*let items = this.cartService.getCart();
    let selected = {};

    for (let obj of items) {
      if (selected[obj.id]) {
        selected[obj.id].count++;
      }else {
        selected[obj.id] = {...obj, count: 1};
      }
    }
    console.log('items0: ', this.selectedItems);
    this.selectedItems = Object.keys(selected).map(key => selected[key]);*/
    this.itemsOffered = this.cartService.getCart()
    .map(element => ({data: element.data, id: element.id}))
    .map(oferta => ({
      insumo: oferta.data.insumo,
      img: oferta.data.img,
      unidad: oferta.data.unidad,
      cantidad: oferta.data.stock,
      cantidadOferta: oferta.data.stock,
      precioUnitario: '0',
      codigoInsumo: oferta.id,
    }));
    console.log('items: ', this.selectedItems);
    console.log('itemsOffered: ', this.itemsOffered);
    // this.total = this.selectedItems.reduce((a, b) => + (b.data.count * b.data.price), 0);
  }

  isCartEmpty() {
    return (this.cartService.getCart().length === 0);
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Su oferta se registro correctamente',
      duration: 5000,
      position: 'top'
    });
    toast.present();
  }

  public submit() {
    console.log(this.registrationForm.value);
    this.cartService.addProductDB(
      {
        nombreEncargado: this.registrationForm.value.name,
        telefonoEncargado: this.registrationForm.value.phone,
        emailEncargado: this.registrationForm.value.email,
        descripcion: this.registrationForm.value.description.contentDesc,
        estado: 'Pendiente',
        idProveedor: this.authService.getSupplierId(),
        insumos: this.itemsOffered.map(input => (
          {
            codigoInsumo: input.codigoInsumo,
            insumo: input.insumo,
            cantidad: input.cantidadOferta,
            precioUnitario: input.precioUnitario,
          }))
      }
    );
    this.presentToast();
    this.cartService.clearCart();
    this.goToHome();
  }

  goToHome() {
    this.router.navigate(['home']);
  }

  removeFromCart(product) {
    // this.cartService.delProduct(product);
    this.itemsOffered = this.itemsOffered.filter(function(item){
      return item != product;
    });
    this.selectedItems = this.selectedItems.filter(function(item){
      return item != product;
    });
    this.cartService.delProduct(product);
  }
}
