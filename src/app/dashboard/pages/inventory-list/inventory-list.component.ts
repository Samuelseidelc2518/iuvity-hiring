import { Component, OnInit } from '@angular/core';
import { PaginationsService } from 'src/app/core/services/paginations.service';
import { InventoryService } from '../../services/inventory/inventory.service';
import { Product } from '../../models/product.model';
import { ToastrService } from 'ngx-toastr';
import { FadeIn } from 'src/app/core/animations/fadeIn.animation';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss'],
  animations: FadeIn.animations,
})
export class InventoryListComponent implements OnInit {
  /* Variables */
  products: Product[] = [];
  collectionSize;
  page = 1;
  pageSize = 6;
  results: any[] = [];
  loading: boolean = true;

  constructor(
    private paginationService: PaginationsService,
    private inventoryService: InventoryService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  async getProducts() {
    try {
      this.products = (await this.inventoryService.getProducts()) as any[];
      if (this.products) {
        this.collectionSize = this.products.length;
        this.refreshResults();
        this.loading = false;
      }
    } catch (e) {
      console.log(e);
      this.loading = false;
      this.toastr.error('Error al cargar los productos', 'Mensaje del sistema');
    }
  }

  refreshResults() {
    this.results = this.paginationService.refreshResults({
      page: this.page,
      pageSize: this.pageSize,
      item: this.products,
    });
  }
}
