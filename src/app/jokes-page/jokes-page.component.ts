import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JokesDto } from 'src/assets/types/jokesDto';
import { AuthService } from 'src/services/auth-service.service';
import { JokesService } from 'src/services/jokes.service';
import { DialogComponent } from '../sharedComponents/dialog/dialog.component';

@Component({
  selector: 'app-jokes-page',
  templateUrl: './jokes-page.component.html',
  styleUrls: ['./jokes-page.component.css'],
})
export class JokesPageComponent implements OnInit {
  jokesArray: JokesDto[] = [];
  displayedColumns: string[] = ['joke'];
  loginUser: string | undefined;

  constructor(
    private jokesService: JokesService,
    public dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (sessionStorage.getItem('userLogedIn') == null) this.logOut();

    this.loginUser = <string>sessionStorage.getItem('userLogedIn');

    this.jokesService.getJokes().subscribe((res: JokesDto[]) => {
      res.forEach(
        (e) =>
          (e.color = `#${Math.floor(Math.random() * 16777215).toString(16)}`)
      );

      this.jokesArray = res;
    });
  }

  getMore(event: any, joke: JokesDto) {
    this.dialog.open(DialogComponent, {
      width: '250px',
      data: {
        joke: joke,
        moreJoke: this.getRandomJoke(<string>joke.category),
      },
    });
  }

  getRandomJoke(category: string) {
    return this.jokesArray.filter((x) => x.category == category)[
      Math.floor(Math.random() * this.jokesArray.length)
    ];
  }

  logOut() {
    this.authService.logOut();
  }
}
