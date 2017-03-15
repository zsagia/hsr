import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer
} from '@angular/core';

// non-typescript definitions
declare var $: JQueryStatic;

@Directive({
  selector: '[froalaEditor]'
})
export class FroalaEditorDirective implements OnInit, OnDestroy {

  // editor options
  private _opts: any = {
    immediateAngularModelUpdate: false,
    angularIgnoreAttrs: null
  };

  // jquery wrapped element
  private _$element: any;

  private SPECIAL_TAGS: string[] = ['img', 'button', 'input', 'a'];
  private INNER_HTML_ATTR: string = 'innerHTML';
  private _hasSpecialTag: boolean = false;

  // editor element
  private _editor: any;

  // initial editor content
  private _model: string;

  private _listeningEvents: string[] = [];

  private _editorInitialized: boolean = false;

  private _oldModel: string = null;

  constructor(@Inject(ElementRef) private el: ElementRef) {

    let element: any = el.nativeElement;

    // check if the element is a special tag
    if (this.SPECIAL_TAGS.indexOf(element.tagName.toLowerCase()) !== -1) {
      this._hasSpecialTag = true;
    }

    // jquery wrap and store element
    this._$element = $(element);
  }

  // froalaEditor directive as input: store the editor options
  @Input() set froalaEditor(opts: any) {
    this._opts = opts || this._opts;
  }

  // froalaModel directive as input: store initial editor content
  @Input() set froalaModel(content: string) {

    if (JSON.stringify(this._oldModel) === JSON.stringify(content)) {
      return;
    }
    this._model = content;

    if (this._editorInitialized) {
      this.setContent();
    }
  }

  // froalaModel directive as output: update model if editor contentChanged
  @Output() froalaModelChange: EventEmitter<any> = new EventEmitter<any>();

  // froalaInit directive as output: send manual editor initialization
  @Output() froalaInit: EventEmitter<Object> = new EventEmitter<Object>();

  // update model if editor contentChanged
  private updateModel() {

    let modelContent: any = null;

    if (this._hasSpecialTag) {

      let attributeNodes = this._$element[0].attributes;
      let attrs = {};

      for (let i = 0; i < attributeNodes.length; i++) {

        let attrName = attributeNodes[i].name;
        if (this._opts.angularIgnoreAttrs && this._opts.angularIgnoreAttrs.indexOf(attrName) !== -1) {
          continue;
        }
        attrs[attrName] = attributeNodes[i].value;
      }

      if (this._$element[0].innerHTML) {
        attrs[this.INNER_HTML_ATTR] = this._$element[0].innerHTML;
      }

      modelContent = attrs;
    } else {

      let returnedHtml: any = this._$element.froalaEditor('html.get');
      if (typeof returnedHtml === 'string') {
        modelContent = returnedHtml;
      }
    }

    this._oldModel = modelContent;
    this.froalaModelChange.emit(modelContent);
  }

  // register event on jquery element
  private registerEvent(element, eventName, callback) {

    if (!element || !eventName || !callback) {
      return;
    }

    this._listeningEvents.push(eventName);
    element.on(eventName, callback);
  }

  private initListeners() {

    let self = this;

    // bind contentChange and keyup event to froalaModel
    this.registerEvent(this._$element, 'froalaEditor.contentChanged', function () {
      self.updateModel();
    });
    if (this._opts.immediateAngularModelUpdate) {
      this.registerEvent(this._editor, 'keyup', function () {
        self.updateModel();
      });
    }
  }

  // register events from editor options
  private registerFroalaEvents() {

    if (!this._opts.events) {
      return;
    }

    for (let eventName in this._opts.events) {

      if (this._opts.events.hasOwnProperty(eventName)) {
        this.registerEvent(this._$element, eventName, this._opts.events[eventName]);
      }
    }
  }

  private createEditor() {

    if (this._editorInitialized) {
      return;
    }

    this.setContent(true);

    // Registering events before initializing the editor will bind the initialized event correctly.
    this.registerFroalaEvents();

    // init editor
    this._editor = this._$element.froalaEditor(this._opts).data('froala.editor').$el;

    this.initListeners();

    this._editorInitialized = true;
  }

  private setContent(firstTime = false) {
    // set initial content
    if (this._model || this._model === '') {
      this._oldModel = this._model;
      if (this._hasSpecialTag) {

        let tags: Object = this._model;

        // add tags on element
        if (tags) {

          for (let attr in tags) {
            if (tags.hasOwnProperty(attr) && attr !== this.INNER_HTML_ATTR) {
              this._$element.attr(attr, tags[attr]);
            }
          }

          if (tags.hasOwnProperty(this.INNER_HTML_ATTR)) {
            this._$element[0].innerHTML = tags[this.INNER_HTML_ATTR];
          }
        }
      } else {

        this.setHtml();

        if (firstTime) {
          this.registerEvent(this._$element, 'froalaEditor.initialized', function () {
            this.setHtml();
          });
        } else {
          this.setHtml();
        }

      }
    }
  }

  private setHtml() {

    this._$element.froalaEditor('html.set', this._model || '', true);
    // This will reset the undo stack everytime the model changes externally. Can we fix this?
    this._$element.froalaEditor('undo.reset');
    this._$element.froalaEditor('undo.saveStep');
  }

  private destroyEditor() {

    if (this._$element) {

      this._$element.off(this._listeningEvents.join(' '));
      this._editor.off('keyup');
      this._$element.froalaEditor('destroy');
      this._listeningEvents.length = 0;
      this._editorInitialized = false;
    }
  }

  private getEditor() {

    if (this._$element) {
      return this._$element.froalaEditor.bind(this._$element);
    }
    return null;
  }

  // send manual editor initialization
  private generateManualController() {
    let controls = {
      initialize: this.createEditor.bind(this),
      destroy: this.destroyEditor.bind(this),
      getEditor: this.getEditor.bind(this),
    };
    this.froalaInit.emit(controls);
  }

  // TODO not sure if ngOnInit is executed after @inputs
  ngOnInit() {

    // check if output froalaInit is present. Maybe observers is private and should not be used?? TODO how to better test that an output directive is present.
    if (!this.froalaInit.observers.length) {
      this.createEditor();
    } else {
      this.generateManualController();
    }
  }

  ngOnDestroy() {
    this.destroyEditor();
  }
}

@Directive({
  selector: '[froalaView]'
})
export class FroalaViewDirective implements AfterViewInit {

  private _element: HTMLElement;

  constructor(private renderer: Renderer, element: ElementRef) {
    this._element = element.nativeElement;
  }

  // update content model as it comes
  @Input() set froalaView(content: string) {
    this._element.innerHTML = content;
  }

  ngAfterViewInit() {
    this.renderer.setElementClass(this._element, 'fr-view', true);
  }
}
