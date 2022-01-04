import { Component, OnInit } from '@angular/core';
import { AlbumsService } from 'src/app/albums.service';
import { AlbumModel } from 'src/models/Album';


@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styles: [
  ]
})
export class CatalogueComponent implements OnInit {
  public albums: AlbumModel[]
  constructor(private albumService:AlbumsService) { }


  ngOnInit() {
    this.albumService.getAllAlbums().subscribe(
      (albums) => (this.albums = albums, console.log(this.albums)),
      (err) => alert(err.message)
    );
  }

}
