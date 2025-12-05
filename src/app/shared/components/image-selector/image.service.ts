import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BlogImage } from '../../models/blog-image.model';
import { environment } from 'src/environments/environment';
import { Uploadimage } from 'src/app/features/blog-post/models/upload-image';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private url= `${environment.apiBaseUrl}/api/images`;
  selectedImage:BehaviorSubject<BlogImage>=new BehaviorSubject<BlogImage>({
    id:'',
    fileExtension:'',
    fileName:'',
    title:'',
    url:''
  });
  constructor(private http:HttpClient) { }

  getAllImages(): Observable<BlogImage[]>{
    return this.http.get<BlogImage[]>(this.url);
  }

  getImageById(id:number): Observable<BlogImage>{
    return this.http.get<BlogImage>(`${environment.apiBaseUrl}/api/images`);

  }

  uploadImage(file:File ,fileName:string,title: string): Observable<BlogImage>{
//private url= `${environment.apiBaseUrl}/api/images`;
    const formData= new FormData();
    formData.append('file',file);
    formData.append('fileName',fileName);
    formData.append('title',title);

    return this.http.post<BlogImage>(`${environment.apiBaseUrl}/api/images`,formData);
    
  }

  selectImage(image:BlogImage):void{
    //logic to select the image
    this.selectedImage.next(image);
  }

  onSelectImage():Observable<BlogImage>{
    return this.selectedImage.asObservable();
  }
}
