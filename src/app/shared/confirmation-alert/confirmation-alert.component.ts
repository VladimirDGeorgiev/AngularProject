import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirmation-alert',
  templateUrl: './confirmation-alert.component.html',
  styleUrls: ['./confirmation-alert.component.scss']
})
export class ConfirmationAlertComponent implements OnInit {

  @Input() message: string;
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }

  onCancal() {
    this.close.emit();
  }

  onConfirm() {
    this.confirm.emit();
  }

}
