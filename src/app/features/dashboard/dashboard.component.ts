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

  form = this.formBuilder.group({
    loops: ['', [Validators.required]],
    laufzeit: ['', [Validators.required]],
    produkt: ['', [Validators.required]],
  });

  count = 0;
  total = 1;

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
    this.loadZinsen(true);
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  loadZinsen(withLoading: boolean): void {
    this.isLoading = withLoading;
    this.zinsenService.getZinsen()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(zinsen => {
        this.zinsen = zinsen;
        this.count++;

        if (withLoading) {
          this.isLoading = false;
        }
      }, error => {
        this.error = error;
        this.isLoading = false;
        throw error;
      })
  }

  startSimulation(): void {
    this.count = 0;
    this.total = this.loops.value;

    this.calculate(0);

    let i = 0
    while (i < this.loops.value) {
      i++;
      if (i === this.loops.value) {
        this.loadZinsen(true);
      } else {
        this.loadZinsen(false);
      }
    }
  }

  calculate(i: number): void {
    this.zinsenService.calculateZins(this.zinsen[i])
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() => {
        i++;
        if (i < this.zinsen.length) {
          this.calculate(i);
        }
      }, error => {
        this.error = error;
        this.isLoading = false;
        throw error;
      });
  }

  create(): void {
    this.isLoading = true;
    this.count = 0;

    this.zinsenService.create(this.laufzeit.value.code, this.produkt.value.code)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() => {
        this.laufzeit.reset();
        this.produkt.reset();
        this.loadZinsen(true);
      }, error => {
        this.error = error;
        this.isLoading = false;
        throw error;
      });
  }

  update(zins: ZinsQuery): void {
    this.isLoading = true;
    this.count = 0;

    this.zinsenService.calculateZins(zins)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() => {
        this.loadZinsen(true);
      }, error => {
        this.error = error;
        this.isLoading = false;
        throw error;
      });
  }

  delete(zins: ZinsQuery): void {
    this.isLoading = true;
    this.count = 0;

    this.zinsenService.delete(zins)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() => {
        this.loadZinsen(true);
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
