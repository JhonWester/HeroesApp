import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://heroesapp-337d7.firebaseio.com';

  constructor(private http: HttpClient) { }

  crearHeroe(heroe: HeroeModel) {
    return this.http.post(this.url + '/heroes.json', heroe).pipe(map((response: any) => {
      heroe.id = response.name;
      return heroe;
    }));
  }

  actualizarHeroe(heroe: HeroeModel) {
    const heroeTemporal = {
      ...heroe
    };
    delete heroeTemporal.id;

    return this.http.put(this.url + '/heroes/' + heroe.id + '.json', heroeTemporal);
  }

  getHeroes() {
    return this.http.get(`${this.url}/heroes.json`).pipe(map(this.crearArreglo), delay(1500));
  }

  private crearArreglo(objetoHeroe: object) {
    const heroes: HeroeModel[] = [];
    if (objetoHeroe === null) {
      return [];
    }
    Object.keys(objetoHeroe).forEach(key => {
      const hero: HeroeModel = objetoHeroe[key];
      hero.id = key;
      heroes.push(hero);
    });
    return heroes;
  }

  getHero(id: string) {
    return this.http.get(`${this.url}/heroes/${id}.json`);
  }

  borrarHeroe(id: string) {
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }
}
