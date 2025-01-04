import { ChangeDetectorRef, Component, ViewEncapsulation, type AfterViewInit, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CKEditorComponent, CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {
	type EditorConfig,
	ClassicEditor,
	AutoImage,
	Autosave,
	BalloonToolbar,
	Base64UploadAdapter,
	BlockQuote,
	Bold,
	CloudServices,
	Code,
	Essentials,
	FontBackgroundColor,
	FontColor,
	FontFamily,
	FontSize,
	Heading,
	Highlight,
	ImageBlock,
	ImageCaption,
	ImageInline,
	ImageInsert,
	ImageInsertViaUrl,
	ImageResize,
	ImageStyle,
	ImageTextAlternative,
	ImageToolbar,
	ImageUpload,
	Indent,
	IndentBlock,
	Italic,
	Link,
	LinkImage,
	List,
	ListProperties,
	MediaEmbed,
	Paragraph,
	PasteFromOffice,
	RemoveFormat,
	SpecialCharacters,
	Strikethrough,
	Subscript,
	Superscript,
	Table,
	TableCaption,
	TableCellProperties,
	TableColumnResize,
	TableProperties,
	TableToolbar,
	TodoList,
	Underline,
	WordCount,
	CodeBlock
} from 'ckeditor5';
import { FormsModule } from '@angular/forms';

const LICENSE_KEY = 'GPL'; // or <YOUR_LICENSE_KEY>.

@Component({
  selector: 'app-editor',
  imports: [FormsModule,CommonModule, CKEditorModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css',
  encapsulation: ViewEncapsulation.None
})
export class EditorComponent implements AfterViewInit {

    @ViewChild('editorWordCountElement') private readonly editorWordCount!: ElementRef<HTMLDivElement>;
    @ViewChild('editorDiv') private readonly editorDiv!: ElementRef<HTMLDivElement>;

	private resizeObserver?: ResizeObserver;
	constructor(private readonly changeDetector: ChangeDetectorRef) {}

	@Input()
	initialData: string | undefined

	@Input()
	isCurrentNote: boolean = false;

	@Input()
	autoFocus: boolean = false;

	@Input()
	width: number = 555;

	@Output()
	widthChange: EventEmitter<number> = new EventEmitter();

	@Output()
	onDataChange: EventEmitter<string> = new EventEmitter(); 

	@Output()
	onFocus: EventEmitter<boolean> = new EventEmitter(); 

	public isLayoutReady = false;
	public Editor = ClassicEditor;
	@ViewChild(CKEditorComponent) ckeditor: CKEditorComponent | undefined;
	public config: EditorConfig = {}; // CKEditor needs the DOM tree before calculating the configuration.
	public ngAfterViewInit(): void {
		this.config = {
			toolbar: {
				items: [
					'fontSize',
					'fontFamily',
					'fontColor',
					'fontBackgroundColor',
					'|',
					'bold',
					'italic',
					'underline',
					'strikethrough',
					'subscript',
					'superscript',
					'codeBlock',
					'removeFormat',
					'|',
					'specialCharacters',
					'link',
					'insertImage',
					'mediaEmbed',
					'insertTable',
					'highlight',
					'blockQuote',
					'|',
					'bulletedList',
					'numberedList',
					'todoList',
					'outdent',
					'indent',
					'|',
					'heading',
					
				],
				shouldNotGroupWhenFull: false
			},
			plugins: [
				AutoImage,
				Autosave,
				BalloonToolbar,
				Base64UploadAdapter,
				BlockQuote,
				Bold,
				CloudServices,
				Code,
				Essentials,
				FontBackgroundColor,
				FontColor,
				FontFamily,
				FontSize,
				Heading,
				Highlight,
				ImageBlock,
				ImageCaption,
				ImageInline,
				ImageInsert,
				ImageInsertViaUrl,
				ImageResize,
				ImageStyle,
				ImageTextAlternative,
				ImageToolbar,
				ImageUpload,
				Indent,
				IndentBlock,
				Italic,
				Link,
				LinkImage,
				List,
				ListProperties,
				MediaEmbed,
				Paragraph,
				PasteFromOffice,
				RemoveFormat,
				SpecialCharacters,
				Strikethrough,
				Subscript,
				Superscript,
				Table,
				TableCaption,
				TableCellProperties,
				TableColumnResize,
				TableProperties,
				TableToolbar,
				TodoList,
				Underline,
				WordCount,
				CodeBlock
			],
			balloonToolbar: ['bold', 'italic', '|', 'link', 'insertImage', '|', 'bulletedList', 'numberedList'],
			fontFamily: {
				supportAllValues: true
			},
			fontSize: {
				options: [10, 12, 14, 'default', 18, 20, 22],
				supportAllValues: true
			},
			heading: {
				options: [
					{
						model: 'paragraph',
						title: 'Paragraph',
						class: 'ck-heading_paragraph'
					},
					{
						model: 'heading1',
						view: 'h1',
						title: 'Heading 1',
						class: 'ck-heading_heading1'
					},
					{
						model: 'heading2',
						view: 'h2',
						title: 'Heading 2',
						class: 'ck-heading_heading2'
					},
					{
						model: 'heading3',
						view: 'h3',
						title: 'Heading 3',
						class: 'ck-heading_heading3'
					},
					{
						model: 'heading4',
						view: 'h4',
						title: 'Heading 4',
						class: 'ck-heading_heading4'
					},
					{
						model: 'heading5',
						view: 'h5',
						title: 'Heading 5',
						class: 'ck-heading_heading5'
					},
					{
						model: 'heading6',
						view: 'h6',
						title: 'Heading 6',
						class: 'ck-heading_heading6'
					}
				]
			},
			image: {
				toolbar: [
					'toggleImageCaption',
					'imageTextAlternative',
					'|',
					'imageStyle:inline',
					'imageStyle:wrapText',
					'imageStyle:breakText',
					'|',
					'resizeImage'
				]
			},
			licenseKey: LICENSE_KEY,
			link: {
				addTargetToExternalLinks: true,
				defaultProtocol: 'https://',
				decorators: {
					toggleDownloadable: {
						mode: 'manual',
						label: 'Downloadable',
						attributes: {
							download: 'file'
						}
					}
				}
			},
			list: {
				properties: {
					styles: true,
					startIndex: true,
					reversed: true
				}
			},
			initialData: this.initialData,
			placeholder: 'Type or paste your content here!',
			table: {
				contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
			}
		};

		this.isLayoutReady = true;
		this.changeDetector.detectChanges();
		this.enableResizeObserver();
	}

	enableResizeObserver(): void {
		this.resizeObserver = new ResizeObserver(entries => {
			entries.forEach(entry => {
			  if (entry.contentRect.width) {
				this.widthChange.emit(entry.contentRect.width);
			  }
			});
		});

		this.resizeObserver.observe(this.editorDiv.nativeElement);

	}

	ngOnDestroy(): void {
		// Clean up observer when component is destroyed
		if (this.resizeObserver) {
		  this.resizeObserver.disconnect();
		}
	}


	public onReady(editor: ClassicEditor): void {
		Array.from(this.editorWordCount.nativeElement.children).forEach(child => child.remove());

		const wordCount = editor.plugins.get('WordCount');
		this.editorWordCount.nativeElement.appendChild(wordCount.wordCountContainer);
		
		if(this.autoFocus){
			editor.focus();
		}
	}

	onEditorChange(event: any){
		this.onDataChange.emit(this.initialData);
	}

	editorFocus(){
		this.onFocus.emit(true);
	}

	editorBlur(){
		this.onFocus.emit(false);
	}

}
