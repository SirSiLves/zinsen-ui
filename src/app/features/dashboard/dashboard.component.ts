import { Component, OnDestroy, OnInit } from '@angular/core';
import { ZinsQuery } from '../../../openapi';
import { Subject } from 'rxjs';
import { ZinsenService } from '../../services/zinsen.service';
import { takeUntil } from 'rxjs/operators';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  onDestroy$ = new Subject<void>()

  zinsen!: ZinsQuery[];
  error: Error | undefined = undefined;

  isLoading = false;
  isCreate = true;

  successCount = 0;

  form = this.formBuilder.group({
    loops: ['', [Validators.required]],
    laufzeit: ['', [Validators.required]],
    produkt: ['', [Validators.required]],
  });

  laufzeiten = [
    {name: 'Unbefristet', code: '0'},
    {name: '1', code: '1'},
    {name: '2', code: '2'},
    {name: '3', code: '3'},
    {name: '4', code: '4'},
    {name: '5', code: '5'},
    {name: '6', code: '6'},
    {name: '7', code: '7'},
    {name: '8', code: '8'},
    {name: '9', code: '9'},
    {name: '10', code: '10'},
  ];

  products = [
    {name: 'Fest Hypothek', code: 'FEST'},
    {name: 'Saron Hypothek', code: 'SARON'}
  ];

  constructor(
    private zinsenService: ZinsenService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.loops.patchValue(0);
    this.isLoading = true;
    this.loadZinsen();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  loadZinsen(): void {
    this.isLoading = true;
    this.zinsenService.getZinsen()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(zinsen => {
        this.zinsen = zinsen;
        this.isLoading = false;
      }, error => {
        this.error = error;
        this.isLoading = false;
        throw error;
      })
  }

  startSimulation(): void {
    this.isLoading = true;
    this.successCount = 0;
    this.zinsenService.simulate(this.loops.value)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(successCount => {
        this.successCount = successCount;
        this.isLoading = false;
      }, error => {
        this.error = error;
        this.isLoading = false;
        throw error;
      })
  }

  calculate(i: number): void {
    this.zinsenService.calculateZins(this.zinsen[i])
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() => {
        i++;
        if (i < this.zinsen.length) {
          this.calculate(i);
        } else {
          this.loadZinsen();
        }
      }, error => {
        this.error = error;
        this.isLoading = false;
        throw error;
      });
  }

  create(): void {
    this.isLoading = true;
    this.zinsenService.create(this.laufzeit.value.code, this.produkt.value.code)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() => {
        this.laufzeit.reset();
        this.produkt.reset();
        this.loadZinsen();
      }, error => {
        this.error = error;
        this.isLoading = false;
        throw error;
      });
  }

  update(zins: ZinsQuery): void {
    this.isLoading = true;
    this.zinsenService.calculateZins(zins)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() => {
        this.loadZinsen();
      }, error => {
        this.error = error;
        this.isLoading = false;
        throw error;
      });
  }

  delete(zins: ZinsQuery): void {
    this.isLoading = true;
    this.zinsenService.delete(zins)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() => {
        this.loadZinsen();
      }, error => {
        this.error = error;
        this.isLoading = false;
        throw error;
      });
  }

  get loops(): FormControl {
    return this.form.controls.loops as FormControl;
  }

  get laufzeit(): FormControl {
    return this.form.controls.laufzeit as FormControl;
  }

  get produkt(): FormControl {
    return this.form.controls.produkt as FormControl;
  }


}
