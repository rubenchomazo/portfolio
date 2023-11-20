import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-whoami2',
  templateUrl: './whoami2.component.html',
  styleUrls: ['./whoami2.component.css'],
})
export class Whoami2Component {
  showMenu: boolean = true;
  showJob1: boolean = true;
  showJob2: boolean = false;
  showJob3: boolean = false;

  changeMode() {
    if (localStorage.getItem('color-theme')) {
      if (localStorage.getItem('color-theme') == 'light') {
        document.documentElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
      }
    } else {
      if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
      }
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

  navLinks() {
    const menuItems = document.querySelector('#menu');
    const menuButtonSpans = document.querySelectorAll('#menu-button span');
    const links = document.querySelectorAll('#menu a');
    links.forEach((link) => {
      link.addEventListener('click', () => {
        menuItems?.classList.add('hidden');
        menuButtonSpans.forEach((span) => {
          span.classList.remove('animado');
        });
      });
    });
    this.showMenu = false;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: { target: { innerWidth: any } }) {
    const menuItems = document.querySelector('#menu');
    const menuButtonSpans = document.querySelectorAll('#menu-button span');
    let w = event.target.innerWidth;
    if (w > 768) {
      menuItems?.classList.add('hidden');
      menuButtonSpans.forEach((span) => {
        span.classList.remove('animado');
      });
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
