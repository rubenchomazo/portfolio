import { Component, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Notification } from './shared/notification.model';
import { WhoamiService } from './service/whoami.service';

@Component({
  selector: 'app-whoami',
  templateUrl: './whoami.component.html',
  styleUrls: ['./whoami.component.css'],
})
export class WhoamiComponent {
  showMenu: boolean = false;
  showMoonFill: boolean = false;
  showJob1: boolean = true;
  showJob2: boolean = false;
  showJob3: boolean = false;
  showStack1: boolean = true;
  showStack2: boolean = false;
  showStack3: boolean = false;
  showStack4: boolean = false;
  showStack5: boolean = false;
  showSuccess: boolean = false;
  showError: boolean = false;
  contactFormControl: any;
  notificationModel: Notification | undefined;

  constructor(
    private whoamiService: WhoamiService,
    private formBuilder: FormBuilder
  ) {
    this.contactFormControl = formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.email],
      subject: 'Contact Portfolio',
      content: '',
    });
  }

  ngOnInit() {
    localStorage.setItem('color-theme', 'dark');
    document.documentElement.classList.add('dark');
    let w = window.innerWidth;
    if (w > 1024) {
      this.showMenu = true;
    } else {
      this.showMenu = false;
    }
  }

  changeMode(mode: string) {
    if (mode == 'light') {
      localStorage.setItem('color-theme', 'light');
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      this.showMoonFill = true;
    } else if (mode == 'dark') {
      localStorage.setItem('color-theme', 'dark');
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      this.showMoonFill = false;
    }
  }

  menuHidden() {
    const menuItems = document.querySelector('#menu');
    const menuButtonSpans = document.querySelectorAll('#menu-button span');
    //Open Menu
    menuItems?.classList.toggle('hidden');
    menuButtonSpans.forEach((span) => {
      span.classList.toggle('animado');
    });
    this.showMenu = true;
  }

  menuShow() {
    this.showMenu = true;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: { target: { innerWidth: any } }) {
    let w = event.target.innerWidth;
    if (w > 1024) {
      this.showMenu = true;
    } else {
      this.showMenu = false;
    }
  }

  // Job Section
  changeJob(jobId: string) {
    let firstLink = document.querySelector('#link1');
    if (jobId == 'job1') {
      this.showJob1 = true;
      this.showJob2 = false;
      this.showJob3 = false;
    } else if (jobId == 'job2') {
      this.showJob1 = false;
      this.showJob2 = true;
      this.showJob3 = false;
      this.changeFocus(firstLink);
    } else if (jobId == 'job3') {
      this.showJob1 = false;
      this.showJob2 = false;
      this.showJob3 = true;
      this.changeFocus(firstLink);
    }
  }

  changeStack(stackId: string) {
    let firstLink = document.querySelector('#linkStack1');
    if (stackId == 'stack1') {
      this.showStack1 = true;
      this.showStack2 = false;
      this.showStack3 = false;
      this.showStack4 = false;
      this.showStack5 = false;
    } else if (stackId == 'stack2') {
      this.showStack1 = false;
      this.showStack2 = true;
      this.showStack3 = false;
      this.showStack4 = false;
      this.showStack5 = false;
      this.changeFocus(firstLink);
    } else if (stackId == 'stack3') {
      this.showStack1 = false;
      this.showStack2 = false;
      this.showStack3 = true;
      this.showStack4 = false;
      this.showStack5 = false;
      this.changeFocus(firstLink);
    } else if (stackId == 'stack4') {
      this.showStack1 = false;
      this.showStack2 = false;
      this.showStack3 = false;
      this.showStack4 = true;
      this.showStack5 = false;
      this.changeFocus(firstLink);
    } else if (stackId == 'stack5') {
      this.showStack1 = false;
      this.showStack2 = false;
      this.showStack3 = false;
      this.showStack4 = false;
      this.showStack5 = true;
      this.changeFocus(firstLink);
    }
  }

  changeFocus(firstLink: Element | null) {
    firstLink?.classList.remove(
      'border-sky-500',
      'bg-white',
      'dark:bg-slate-700'
    );
  }

  sendNotification() {
    if (
      (this.contactFormControl.value.name == undefined ||
        this.contactFormControl.value.name == '') &&
      (this.contactFormControl.value.email == undefined ||
        this.contactFormControl.value.email == '')
    ) {
      this.showError = true;
    } else {
      this.notificationModel = new Notification(
        this.contactFormControl?.value.name,
        this.contactFormControl?.value.email,
        'Portfolio Contact me',
        this.contactFormControl?.value.content
      );
      this.whoamiService.sendNotification(this.notificationModel);
      this.showError = false;
      this.showSuccess = true;
    }
  }
}
