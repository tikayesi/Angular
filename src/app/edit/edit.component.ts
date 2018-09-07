import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MahasiswaService } from '../mahasiswa.service';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  coin: any;
  angForm: FormGroup;
  title = 'Edit Coin';
  constructor(private route: ActivatedRoute, private router: Router, private service: MahasiswaService, private fb: FormBuilder) {
    this.createForm();
   }

  createForm() {
    this.angForm = this.fb.group({
      npm: ['', Validators.required ],
      nama: ['', Validators.required ],
      alamat: ['', Validators.required ],
   });
  }

  ubahMahasiswa(npm, nama, alamat) {
    this.route.params.subscribe(params => {
    this.service.ubahMahasiswa(npm, nama, alamat, params['id']);
  });
}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.service.ambil1Mahasiswa(params['id']).subscribe((res: any) => {
        this.angForm.get('npm').setValue(res.npm);
        this.angForm.get('nama').setValue(res.nama);
        this.angForm.get('alamat').setValue(res.alamat);
      }, err => {
              alert('ERROR !!!' + "\n" + err.error.description)
              location.href = "/index";
            });
    });
  }
}