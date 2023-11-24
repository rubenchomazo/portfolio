import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-whoami',
  templateUrl: './whoami.component.html',
  styleUrls: ['./whoami.component.css'],
})
export class WhoamiComponent {
  showMenu: boolean = true;
  showMoonFill: boolean = false;
  showJob1: boolean = true;
  showJob2: boolean = false;
  showJob3: boolean = false;

  ngOnInit() {
    localStorage.setItem('color-theme', 'dark');
    document.documentElement.classList.add('dark');
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
    const links = document.querySelectorAll('#menu a');
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
      firstLink?.classList.remove(
        'border-sky-500',
        'bg-white',
        'dark:bg-slate-700'
      );
    } else if (jobId == 'job3') {
      this.showJob1 = false;
      this.showJob2 = false;
      this.showJob3 = true;
      firstLink?.classList.remove(
        'border-sky-500',
        'bg-white',
        'dark:bg-slate-700'
      );
    }
  }
}
