import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ReplaySubject } from 'rxjs';

import { PROVINCES } from '../../../@core/data/province-districts.geo';
import { TranslationServiceEn } from '../../../services/i18n/translation-gen.service';
import { DialogData } from '../case.model';
import { ActiveTasksInfo } from '../../../@models/cict/covhub/active-tasks';



const OnDestroySubject = Symbol('OnDestroySubject');

@Component({
  selector: 'cov-new-case',
  templateUrl: './new-case.component.html',
  styleUrls: ['./new-case.component.scss']
})
export class NewCaseComponent implements OnInit, OnDestroy {


  provinces: string[];
  destinationOpts: string[] | undefined;
  addressOpts: string[] | undefined;
  finalDestProvince: string = '';
  districts = { destinationOpts: null, addressOpts: null };

  saveToCache = true;
  newTask: ActiveTasksInfo = {
    date: null,
    lab: '',
    case: '',
    phone: null,
    province: '',
    district: '',
    municipal: '',
    ward: null,
    tole: '',
    assignedTo: '',
    time: ''
  };

  private [OnDestroySubject] = new ReplaySubject<true>(1);

  showOtherOccupation = false;

  constructor(
    public t: TranslationServiceEn,
    private translator: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
      this.translator.use('en');
  }

  ngOnInit() {
    this.provinces = PROVINCES?.map(province => province.name);
  }

  ngOnDestroy(): void {
    this[OnDestroySubject].next(true);
    this[OnDestroySubject].complete();
  }

  get onDestroy$() {
    return this[OnDestroySubject].asObservable();
  }

  addNewTask(_: any) {
    this.saveToCache = false;
  }

  changeDestProvince(event: string) {
    this.finalDestProvince = event;
    this.districts.destinationOpts = PROVINCES?.find(province => province.name === this.finalDestProvince)?.districts;
  }

}
