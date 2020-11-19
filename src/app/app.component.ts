import {AfterViewInit, Component, ComponentFactoryResolver, Injector, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {loadRemoteModule} from './federation-utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'angular-v11';

  @ViewChild('vc', { read: ViewContainerRef, static: true })
  viewContainer!: ViewContainerRef;

  constructor(
    private injector: Injector,
    private resolver: ComponentFactoryResolver
  ) {}

  ngAfterViewInit(): void {
    loadRemoteModule({
      remoteEntry: 'http://localhost:4201/remoteEntry.js',
      remoteName: 'remoteAppExample',
      exposedModule: './Component',
    })
      .then(m => {
        return m.AppComponent;
      })
      .then(comp => {
        const factory = this.resolver.resolveComponentFactory(comp);
        this.viewContainer.createComponent(factory, undefined, this.injector);
      });
  }
}
