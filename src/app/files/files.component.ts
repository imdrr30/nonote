import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface NonoteFile{
  name: string;
  size: number;
  type: string;
  lastModified: number;
  uploaded: Date;
  data: any;

}

@Component({
  selector: 'app-files',
  imports: [],
  templateUrl: './files.component.html',
  styleUrl: './files.component.css'
})
export class FilesComponent {

  @Input()
  files: NonoteFile[] = [];

  @Output()
  filesChange: EventEmitter<NonoteFile[]> = new EventEmitter();
}
