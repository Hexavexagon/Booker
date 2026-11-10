// Angular
import { Component } from '@angular/core';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDateFormats } from '@angular/material/core';
import { provideLuxonDateAdapter } from '@angular/material-luxon-adapter';

// Material
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

// Third Party Libraries
import _ from 'lodash';
import { DateTime } from 'luxon';


export type StaffMember = {
  name: string,
  days: number[],
};

export const DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'DATE_SHORT',
    timeInput: '',
  },
  display: {
    dateInput: 'DATE_SHORT',
    monthYearLabel: '',
    dateA11yLabel: 'DATE_HUGE',
    monthYearA11yLabel: '',
  },
}

@Component({
  selector: 'app-client',
  imports: [
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  providers: [
    provideLuxonDateAdapter(),
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'en-NZ' },
  ],
  styleUrl: './client.less',
  templateUrl: './client.html',
})
export class Client {
  staff: StaffMember[];
  allStaffDays: number[];
  selectedStaffMember: StaffMember | undefined = undefined;

  mockDavid: StaffMember = {
    name: 'David',
    days: [ 1, 2, 3 ],
  }
  mockSarah: StaffMember = {
    name: 'Sarah',
    days: [ 2, 3, 4 ],
  }

  constructor() {
    this.staff = [
      this.mockDavid,
      this.mockSarah,
    ];
    this.allStaffDays = _.uniq(_.flatten(_.map(this.staff, 'days')));
  }

  availableDays = (d: any): boolean => {
    // Blacklist days in the past
    if (!d || DateTime.fromMillis(d.ts) < DateTime.now()) {
      return false;
    }
    // Whitelist days the staff member has bookings
    if (this.selectedStaffMember) {
      // Had to iterate because _.includes is using strict equality (===)
      let done = false;
      _.each(this.selectedStaffMember.days, (day) => {
        // toFormat('E') gives the day of the week
        if (day == d.toFormat('E')) {
          done = true;
        }
      });
      return done;
    }
    else {
      // Had to iterate because _.includes is using strict equality (===)
      let done = false;
      _.each(this.allStaffDays, (day) => {
        // toFormat('E') gives the day of the week
        if (day == d.toFormat('E')) {
          done = true;
        }
      });
      return done;
    }
  };
}
