import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Brand } from '../shared/models/brand';
import { Pagination } from '../shared/models/pagination';
import { Product } from '../shared/models/product';
import { ShopParams } from '../shared/models/shopParams';
import { Type } from '../shared/models/type';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) { }

getProducts(shopParams: ShopParams){
  let params = new HttpParams();

  if (shopParams.brandId) params = params.append('brandId', shopParams.brandId);
  if (shopParams.typeId) params = params.append('typeId', shopParams.typeId);
  params = params.append('sort', shopParams.sort);
  params = params.append('pageIndex', shopParams.pageNumber);
  params = params.append('pageSize', shopParams.pageSize);
  if (shopParams.search) params = params.append('search', shopParams.search);

  return this.http.get<Pagination<Product[]>>(this.baseUrl + 'products', {params});
}

getProduct(id: number) {
  return this.http.get<Product>(this.baseUrl + 'products/' + id);
}

getBrands(){
  return this.http.get<Brand[]>(this.baseUrl + 'products/brands');
}

getTypes() {
  return this.http.get<Type[]>(this.baseUrl + 'products/types');
}
}
