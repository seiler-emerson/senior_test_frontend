import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  links!: Array<any>;

  constructor() { }

  ngOnInit(): void {
    this.links = new Array();

    this.links.push(
      {
        rota: 'dashboard',
        // rota: ['/dashboard', 'Teste'],
        textContent: 'Dashboard',
        icon: 'dashboard'
      }
    )
    this.links.push(
      {
        rota: 'productservice',
        // rota: ['/dashboard', 'Teste'],
        textContent: 'Produtos/Serviços',
        icon: 'inventory_2'
      }
    )
    this.links.push(
      {
        rota: 'orders',
        // rota: ['/dashboard', 'Teste'],
        textContent: 'Pedidos',
        icon: 'post_add'
      }
    )
  }

}
