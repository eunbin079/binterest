import { isPlatformBrowser } from '@angular/common';
import { ClassProvider, FactoryProvider, InjectionToken, PLATFORM_ID } from '@angular/core';

//create a new injection token for injecting the window into a component
export const WINDOW = new InjectionToken('WindowToken');

//define abstract class for obtaining reference to the global window object
export abstract class WindowRef {

    get nativeWindow(): Window | Object{
        throw new Error('Not implemented.');
    }
}

//define class that implements the abstract class and returns the native window object
export class BrowserWindowRef extends WindowRef{

    constructor(){
        super();
    }
    
    get nativeWindow(): Window | Object {
        return window;
    }
}
//create an factory function that returns the native window object

export function windowFactory(browserWindowRef: BrowserWindowRef,platformId:Object) : Window | Object {
    if(isPlatformBrowser(platformId)){
        return browserWindowRef.nativeWindow;
    }
    return new Object();

}

//create a injectable provider for the WindowRef token that uses the BrowserWindowREF CLASS

export const browserWindowProvider : ClassProvider ={
    provide: WindowRef,
    useClass: BrowserWindowRef
};

//create a injectable provider that uses the window factory function for returning
export const windowProvider : FactoryProvider = {
    provide: WINDOW,
    useFactory : windowFactory,
    deps:[WindowRef,PLATFORM_ID]
};
//CREATE AN ARRAY OF PROVIDER
export const WINDOW_PROVIDERS = [
    browserWindowProvider,
    windowProvider
]