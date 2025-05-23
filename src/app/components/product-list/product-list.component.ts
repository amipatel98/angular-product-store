import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { StyleClassModule } from 'primeng/styleclass';
import { RatingModule } from 'primeng/rating';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    TableModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    PaginatorModule,
    StyleClassModule,
    RatingModule,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  productList: any[] = [];
  searchProduct: string = '';
  filteredProductList: any[] = [];
  loading: boolean = true;
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.productList = data;
      this.filteredProductList = data;
      this.loading = false;
      // console.log('productList', this.productList);
    });
  }

  filterProductList() {
    const term = this.searchProduct.toLowerCase();
    this.filteredProductList = this.productList.filter(
      (product) =>
        product.title.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term)
    );
  }
}
