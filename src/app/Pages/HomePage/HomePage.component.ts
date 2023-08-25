import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Step from 'src/app/Models/Step.model';

@Component({
  selector: 'HomePage',
  templateUrl: './HomePage.component.html',
  styleUrls: ['./HomePage.component.css'],
})
export class HomePageComponent {
  constructor(public router: Router) {}

  public steps: Step[] = [
    {
      title: '1. Sign up',
      imgSrc: '../../../assets/images/signupangular.svg',
      desc: 'Join our community of users and make your voice heard with ourfree, easy-to-use polling website!',
    },
    {
      title: '2. Create',
      imgSrc: '../../../assets/images/createangular.svg',
      desc: 'Create polls on our website to gather feedback and make informed decisions.',
    },
    {
      title: '3. Share',
      imgSrc: '../../../assets/images/shareangular.svg',
      desc: 'Share your polls you create to your social media platforms to increase reach and engagement.',
    },
    {
      title: '4. Analyze',
      imgSrc: '../../../assets/images/statsangular.svg',
      desc: "Analyze your polls results to identify trends and gain insights into your audience's preferences.",
    },
  ];
}
