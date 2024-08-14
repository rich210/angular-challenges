import {
  animate,
  keyframes,
  query,
  stagger,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { AfterContentInit, Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  selector: 'app-root',
  styles: `
    section {
      @apply flex flex-1 flex-col gap-5;
    }

    .list-item {
      @apply flex flex-row border-b px-5 pb-2;

      span {
        @apply flex-1;
      }
    }
  `,
  template: `
    <div class="mx-20 my-40 flex gap-5">
      <section [@slide]="visibleState">
        <div>
          <h3>2008</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
            mollitia sequi accusantium, distinctio similique laudantium eveniet
            quidem sit placeat possimus tempore dolorum inventore corporis atque
            quae ad, nobis explicabo delectus.
          </p>
        </div>

        <div>
          <h3>2010</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
            mollitia sequi accusantium, distinctio similique laudantium eveniet
            quidem sit placeat possimus tempore dolorum inventore corporis atque
            quae ad, nobis explicabo delectus.
          </p>
        </div>

        <div>
          <h4>2012</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
            mollitia sequi accusantium, distinctio similique laudantium eveniet
            quidem sit placeat possimus tempore dolorum inventore corporis atque
            quae ad, nobis explicabo delectus.
          </p>
        </div>
      </section>

      <section [@staggerAnimation]="showStagger">
        @if (showStagger) {
          <div class="list-item">
            <span>Name:</span>
            <span>Samuel</span>
          </div>

          <div class="list-item">
            <span>Age:</span>
            <span>28</span>
          </div>

          <div class="list-item">
            <span>Birthdate:</span>
            <span>02.11.1995</span>
          </div>

          <div class="list-item">
            <span>City:</span>
            <span>Berlin</span>
          </div>

          <div class="list-item">
            <span>Language:</span>
            <span>English</span>
          </div>

          <div class="list-item">
            <span>Like Pizza:</span>
            <span>Hell yeah</span>
          </div>
        }
      </section>
    </div>
  `,
  animations: [
    trigger('slide', [
      state(
        '*',
        style({
          opacity: 0,
          transform: 'translateX(-100px)',
        }),
      ),
      state(
        'visible',
        style({
          opacity: 1,
        }),
      ),
      transition(':enter', animate('400ms 300ms ease-out')),
      transition('* => visible', animate('1000ms ease-out')),
      transition('visible => *', animate('1000ms ease-out')),
    ]),
    trigger('staggerAnimation', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),
        query(
          ':enter',
          stagger('200ms', [
            animate(
              '400ms ease-in',
              keyframes([
                style({
                  opacity: 0,
                  transform: 'translateX(-75px)',
                  offset: 0,
                }),
                style({
                  opacity: 0.5,
                  transform: 'translateX(35px)',
                  offset: 0.3,
                }),
                style({ opacity: 1, transform: 'translateX(0)', offset: 1 }),
              ]),
            ),
          ]),
          { optional: true },
        ),

        query(
          ':leave',
          stagger('100ms', [
            animate(
              '300ms ease-in',
              keyframes([
                style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
                style({
                  opacity: 0.5,
                  transform: 'translateX(35px)',
                  offset: 0.3,
                }),
                style({
                  opacity: 0,
                  transform: 'translateX(-75px)',
                  offset: 1,
                }),
              ]),
            ),
          ]),
          { optional: true },
        ),
      ]),
    ]),
  ],
})
export class AppComponent implements AfterContentInit {
  show = true;
  showStagger = false;

  get visibleState() {
    return this.show ? 'hidden' : 'visible';
  }

  ngAfterContentInit(): void {
    setTimeout(() => {
      this.show = false;
      this.showStagger = true;
    }, 2000);

    setTimeout(() => {
      this.showStagger = false;
      this.show = true;
    }, 10000);
  }
}
