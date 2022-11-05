import { Component, OnInit } from '@angular/core';
import { SystemService } from 'src/app/services/system.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private systemService: SystemService,
  ) { }

  ngOnInit(): void {
    this.sendTitle()
  }

  sendTitle() {
    this.systemService.currentTitle = "Dashboard"
  }
}
