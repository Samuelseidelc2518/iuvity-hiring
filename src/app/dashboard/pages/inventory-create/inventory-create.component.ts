import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormsService } from 'src/app/core/services/forms.service';
import { Product } from '../../models/product.model';
import { InventoryService } from '../../services/inventory/inventory.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FadeIn } from 'src/app/core/animations/fadeIn.animation';

@Component({
  selector: 'app-inventory-create',
  templateUrl: './inventory-create.component.html',
  styleUrls: ['./inventory-create.component.scss'],
  animations: FadeIn.animations,
})
export class InventoryCreateComponent implements OnInit {
  /* Variables */
  productForm: FormGroup;
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private formsService: FormsService,
    private inventoryService: InventoryService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.productForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      price: [''],
      quantity: [
        '',
        [Validators.required, Validators.min(1), Validators.max(5000)],
      ],
    });
  }

  ngOnInit(): void {}

  get form() {
    return this.productForm.controls;
  }

  async onSubmit() {
    if (this.productForm.invalid || this.loading) {
      this.formsService.validateAllFormFields(this.productForm);
      return;
    }

    this.loading = true;

    const product: Product = this.productForm.value;
    console.log(product);

    try {
      const res = await this.inventoryService.createProduct(product);

      if (res) {
        console.log(res);
        this.toastr.success('Producto creado', 'Mensaje del sistema');
        this.router.navigate(['/dashboard/inventory/list']);
        this.loading = false;
      }
    } catch (e) {
      console.log(e);
      this.toastr.error('Error al crear el producto', 'Mensaje del sistema');
      this.loading = false;
    }
  }
}
