import {Component, ViewChild} from '@angular/core';
import {OilQualityService} from "../services/oil-quality.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  title = 'oilQuality';
  name = 'This is XLSX TO JSON CONVERTER';
  loading = false;
  showButtonEvaluate = false;
  oilResult = {
    rating: null,
    probability: 0,
    setted: false
  };
  @ViewChild('fileInput') fileInput: any;
  outputJson = '';
  file: any;

  constructor(private oilQualityService: OilQualityService) {
  }

  onClickFileInputButton(): void {
    this.fileInput.nativeElement.click();
  }

  public onFileChange(event: any): void {
    this.file = event.target.files[0];
    this.showButtonEvaluate = true;
  }

  public onUploadClick(): void {
    this.loading = true;
    if (this.file) {
      this.oilQualityService.uploadFile(this.file).subscribe(result => {
        if(result) {
          this.oilResult = result.data;
          this.oilResult.setted = true;
        }
        this.loading = false;
      }, error => {
        console.log('#### Error: ', JSON.stringify(error))
      });
    }
  }

  /*
  onFileChange(event: any) {
    this.loading = true;
    let jsonData = null;
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.onload = () => {
      const data = reader.result;
      const workBook = XLSX.read(data, {type: 'binary'});
      jsonData = workBook.SheetNames.reduce((initial: any, name: string) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      this.outputJson = jsonData;

      const dataString = JSON.stringify(jsonData);
      // this.outputJson = dataString.slice(0, 300).concat("...");
      this.setDownload(dataString);
    }
    reader.readAsBinaryString(file);
  }


  setDownload(data: string | number | boolean) {
    setTimeout(() => {
      const el = document.querySelector("#download");
      if (el) {
        el.setAttribute("href", `data:text/json;charset=utf-8,${encodeURIComponent(data)}`);
        el.setAttribute("download", 'xlsxtojson.json');
      }
      this.oilResult.rating = 'GOOD';
      this.oilResult.probability = 99.1916;
      this.loading = false;
      this.willDownload = true;
    }, 1000)
  }
   */


}
