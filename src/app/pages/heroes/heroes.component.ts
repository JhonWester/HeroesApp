import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from '../../models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: HeroeModel[] = [];
  cargando = false;

  constructor(private heroService: HeroesService) { }

  ngOnInit() {
    this.cargando = true;
    this.heroService.getHeroes().subscribe(response => {
      this.heroes = response;
      this.cargando = false;
    });
  }

  borrarHeroe(heroe: HeroeModel, posicion: number) {
    Swal.fire({
      title: 'Borrar Heroe',
      text: `Esta seguro que desea borrar a ${heroe.nombre}`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true,
      }).then(res => {
        if (res.value) {
          this.heroService.borrarHeroe(heroe.id).subscribe();
          this.heroes.splice(posicion, 1);
        }
    });
  }
}
