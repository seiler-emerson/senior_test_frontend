import { Component, OnInit } from '@angular/core';
import { catchError, of } from 'rxjs';
import { OrderService } from 'src/app/services/crud/order.service';
import { ProductServiceService } from 'src/app/services/crud/product-service.service';
import { SystemService } from 'src/app/services/system.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  lastSevenDays: Array<any> = []
  totalOrdersLastSevenDays: Array<any> = [0,0,0,0,0,0,0]
  styleGraphic = {
    primary: "#6571ff",
    secondary: "#7987a1",
    success: "#05a34a",
    info: "#66d1d1",
    warning: "#fbbc06",
    danger: "#ff3366",
    light: "#e9ecef",
    dark: "#060c17",
    muted: "#7987a1",
    gridBorder: "rgba(77, 138, 240, .15)",
    bodyColor: "#000",
    cardBg: "#fff",
    vd: "#DC143C",
    fontFamily: "'Roboto', Helvetica, sans-serif"
  }
  dataGraphicOrders: any = {}


  constructor(
    private systemService: SystemService,
    public productServiceService: ProductServiceService,
    public orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.sendTitle()
    this.listAllProductService()
    this.listAllOrder()
    this.gerateDataSevenDay()
    setTimeout(() => {
      this.getAmountAOrdersDate()
      this.dataGraphicOrders = this.graphicOrdersLastSevenDays()
    }, 1000);
    
    
  }

  sendTitle() {
    this.systemService.currentTitle = "Dashboard"
  }

  listAllProductService(): void {
    this.productServiceService
      .getAll()
      .pipe(
        catchError((error) => {
        
          return of(false);
        })
      )
      .subscribe((response) => {
        this.productServiceService.productServiceList = response;
      });
  }

  listAllOrder(): void {
    this.orderService
      .getAll()
      .pipe(
        catchError((error) => {
          return of(false);
        })
      )
      .subscribe((response) => {
        this.orderService.orderList = response;
      });
  }


  gerateDataSevenDay() {
    let hoje: any = ""
    let ontem: any = ""
    hoje = new Date()
    this.lastSevenDays.push(("0" + hoje.getDate()) + "/" + (hoje.getMonth() + 1))
    
    for (let count = 0; count < 6; count++) {
      ontem = new Date(hoje.getTime())
      ontem.setDate(hoje.getDate() - 1)
      let date = ((ontem.getDate()) + "/" + (ontem.getMonth() + 1))
      // console.log(date);
      if (date.length === 4) {
        date = "0" + date
      }
      hoje = ontem
      this.lastSevenDays.push(date)
    }
  }


  getAmountAOrdersDate() {
    for (let count = 0; count < this.orderService.orderList.length; count++) {
      for (let countDay = 0; countDay < this.lastSevenDays.length; countDay++) {
        if (this.orderService.orderList[count].date.split(" ")[0].slice(0, 5) === this.lastSevenDays[countDay]) {
          this.totalOrdersLastSevenDays[countDay] = this.totalOrdersLastSevenDays[countDay] + 1
        }
      }
    }
  }

  graphicOrdersLastSevenDays() {
    return {
      chart: {
        type: "line",
        height: "550",
        width: '100%',
        parentHeightOffset: 0,
        foreColor: this.styleGraphic.bodyColor,
        background: this.styleGraphic.cardBg,
        toolbar: {
          show: false,
        },
      },
      theme: {
        mode: "light",
      },
      tooltip: {
        theme: "light",
      },
      colors: [this.styleGraphic.vd],
      fill: {
        opacity: 0.9,
      },
      grid: {
        padding: {
          bottom: -4,
        },
        borderColor: this.styleGraphic.gridBorder,
        xaxis: {
          lines: {
            show: true,
          },
        },
      },
      series: [
        {
          name: "Quantidade Pedidos no dia",
          data: this.totalOrdersLastSevenDays,
        },
      ],
      xaxis: {
        categories: this.lastSevenDays,
        axisBorder: {
          color: this.styleGraphic.gridBorder,
        },
        axisTicks: {
          color: this.styleGraphic.gridBorder,
        },
      },
      yaxis: {
        min: 0,
        max: this.totalOrdersLastSevenDays.reduce(function (prev, current) {
          return prev > current ? prev + 0.25 : current + 0.25;
        }),
        forceNiceScale: true,
        title: {
          text: "Total de Pedidos",
          style: {
            size: 9,
            color: this.styleGraphic.muted,
          },
        },
      },
      legend: {
        show: true,
        position: "top",
        horizontalAlign: "center",
        fontFamily: this.styleGraphic.fontFamily,
        itemMargin: {
          horizontal: 8,
          vertical: 2,
        },
      },
      stroke: {
        width: 3,
        curve: "smooth",
        lineCap: "round"
      },
      dataLabels: {
        enabled: false,
      },
    }
  }
}
