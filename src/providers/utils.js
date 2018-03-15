import { Injectable, NgZone } from '@angular/core';

 
@Injectable()
export class Utils {

    constructor() {
    }
openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
}


}
