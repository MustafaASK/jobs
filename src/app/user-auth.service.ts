import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, debounce, map, take } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from './../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  apiEndPoint: string = '';
  categoryList: any;
  languagesList: any;
  debounceApiKey: string = '';
  resume: File[] = [];
  constructor(private http: HttpClient, private router: Router) {
    console.log(environment);
    this.apiEndPoint = environment.apiUrl;
    this.debounceApiKey = environment.debounceApiKey;
  }
  // console.log(this.apiEndPoint);
  // debugger;
  // signupUrl: string = 'http://localhost:3000/todos';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  getPackages(): Observable<any> {
    let API_URL = `${this.apiEndPoint}`;
    let hdr = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', 'Bearer e4f54cb653914aaadc6ea1666b72f5e23e7a68a1');
    return this.http
      .get('https://api.criteriacorp.com/api/v1/packages', { headers: hdr })
      .pipe(catchError(this.handleError));
  }
  // {baseURL}/status?orderId={orderId}
  getCandidateScore(orderid: any) {
    // console.log(localStorage.getItem('userToken'));
    let API_URL = `${this.apiEndPoint}`;
    let hdr = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', 'Bearer e4f54cb653914aaadc6ea1666b72f5e23e7a68a1');
    return this.http
      .get('https://api.criteriacorp.com/api/v1/scores?orderId=' + orderid, {
        headers: hdr,
      })
      .pipe(catchError(this.handleError));
  }

  getCandidateStatus(orderid: any) {
    // console.log(localStorage.getItem('userToken'));
    let API_URL = `${this.apiEndPoint}`;
    let hdr = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', 'Bearer e4f54cb653914aaadc6ea1666b72f5e23e7a68a1');
    return this.http
      .get('https://api.criteriacorp.com/api/v1/status?orderId=' + orderid, {
        headers: hdr,
      })
      .pipe(catchError(this.handleError));
  }

  //getaccuickjobs

  getAccuickJob() {
    // console.log(localStorage.getItem('userToken'));
    let API_URL = `${this.apiEndPoint}`;
    let hdr = new HttpHeaders().set('content-type', 'application/json');
    // this.http.get('https://www4.accuick.com/Accuick/jobs_csninja.jsp',

    return this.http
      .get(API_URL + 'getaccuickjobs', { headers: hdr })
      .pipe(catchError(this.handleError));
  }

  orderHireSelect(data: any): Observable<any> {
    let API_URL = `${this.apiEndPoint}`;
    let hdr = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', 'Bearer e4f54cb653914aaadc6ea1666b72f5e23e7a68a1');
    return this.http
      .post('https://api.criteriacorp.com/api/v1/order', data, { headers: hdr })
      .pipe(catchError(this.handleError));
  }

  smartyStreetsSearch(data: any): Observable<any> {
    let API_URL = `${this.apiEndPoint}`;
    let hdr = new HttpHeaders();
    return this.http
      .get('https://us-autocomplete-pro.api.smartystreets.com/lookup?' + data, {
        headers: hdr,
      })
      .pipe(catchError(this.handleError));
  }

  //register
  signup(data: any): Observable<any> {
    let API_URL = `${this.apiEndPoint}`;
    return this.http
      .post(API_URL + 'signup', data, { observe: 'response' })
      .pipe(catchError(this.handleError));
  }

  //register
  getSocialLoginData(data: any): Observable<any> {
    let API_URL = `${this.apiEndPoint}`;
    // let hdr = new HttpHeaders()
    //   .set("Authorization", "Basic " + (("18881239-fddb-4b7c-b384-998177c61815")))
    // return this.http.get("https://app-1084729-1.api.oneall.com/connections/" + token + ".json", { 'headers': hdr })
    //   .pipe(
    //     catchError(this.handleError)
    //   )

    let hdr = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('csn-auth-token', localStorage.getItem('userToken') || '{}');
    // return this.http.get(API_URL + 'connectiontoken',data, { 'headers': hdr })
    // .pipe(
    //   catchError(this.handleError)
    // )
    return this.http
      .post(API_URL + 'connectiontoken', data, { observe: 'response' })
      .pipe(catchError(this.handleError));
  }

  //getPreferences
  getPreferences() {
    // console.log(localStorage.getItem('userToken'));
    let API_URL = `${this.apiEndPoint}`;
    let hdr = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('csn-auth-token', localStorage.getItem('userToken') || '{}');
    return this.http
      .get(API_URL + 'getpreferencelist/' + localStorage.getItem('userId'), {
        headers: hdr,
      })
      .pipe(catchError(this.handleError));
  }
  getprofilepreferencelist(data: any) {
    // console.log(localStorage.getItem('userToken'));
    let API_URL = `${this.apiEndPoint}`;
    let hdr = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('csn-auth-token', localStorage.getItem('userToken') || '{}');
    return this.http
      .get(API_URL + 'getprofilepreferencelist/' + data, { headers: hdr })
      .pipe(catchError(this.handleError));
  }
  //get categories
  getcategorylist() {
    // console.log(localStorage.getItem('userToken'));

    if (localStorage.getItem('userToken')) {
      let API_URL = `${this.apiEndPoint}`;
      let hdr = new HttpHeaders()
        .set('content-type', 'application/json')
        .set('csn-auth-token', localStorage.getItem('userToken') || '{}');
      return this.http
        .get(API_URL + 'categorylist', { headers: hdr })
        .pipe(catchError(this.handleError));
    } else {
      let API_URL = `${this.apiEndPoint}`;
      let hdr = new HttpHeaders().set('content-type', 'application/json');
      return this.http
        .get(API_URL + 'categorylist', { headers: hdr })
        .pipe(catchError(this.handleError));
    }
  }

  //get review data
  getreviewdetails() {
    console.log(localStorage.getItem('userToken'));
    let API_URL = `${this.apiEndPoint}`;
    let hdr = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('csn-auth-token', localStorage.getItem('userToken') || '{}');
    return this.http
      .get(API_URL + 'getreviewdetails/' + localStorage.getItem('userId'), {
        headers: hdr,
      })
      .pipe(catchError(this.handleError));
  }
  profilepreview(data: any) {
    console.log(localStorage.getItem('userToken'));
    let API_URL = `${this.apiEndPoint}`;
    let hdr = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('csn-auth-token', localStorage.getItem('userToken') || '{}');
    return this.http
      .get(API_URL + 'profilepreview/' + data, { headers: hdr })
      .pipe(catchError(this.handleError));
  }

  getlanguageslist() {
    if (localStorage.getItem('userToken')) {
      let API_URL = `${this.apiEndPoint}`;
      let hdr = new HttpHeaders()
        .set('content-type', 'application/json')
        .set('csn-auth-token', localStorage.getItem('userToken') || '{}');
      return this.http
        .get(API_URL + 'getlanguageslist', { headers: hdr })
        .pipe(catchError(this.handleError));
    } else {
      let API_URL = `${this.apiEndPoint}`;
      let hdr = new HttpHeaders().set('content-type', 'application/json');
      return this.http
        .get(API_URL + 'getlanguageslist', { headers: hdr })
        .pipe(catchError(this.handleError));
    }
  }

  //save employment
  saveoreditemploymentdetails(data: any): Observable<any> {
    let API_URL = `${this.apiEndPoint}`;
    let hdr = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('csn-auth-token', localStorage.getItem('userToken') || '{}');
    return this.http
      .post(API_URL + 'saveoreditemploymentdetails', data, { headers: hdr })
      .pipe(catchError(this.handleError));
  }

  //saveoreditpreferencedetails
  saveoreditpreferencedetails(data: any): Observable<any> {
    let API_URL = `${this.apiEndPoint}`;
    let hdr = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('csn-auth-token', localStorage.getItem('userToken') || '{}');
    return this.http
      .post(API_URL + 'saveoreditpreferencedetails', data, { headers: hdr })
      .pipe(catchError(this.handleError));
  }

  // Save Resume
  applyjobexternalsites(data: any): Observable<any> {
    let API_URL = `${this.apiEndPoint}`;
    let hdr = new HttpHeaders()
      //  .set('content-type','application/json')
      .set('csn-auth-token', localStorage.getItem('userToken') || '{}');
    return this.http
      .post(API_URL + 'applyjobexternalsites', data, {
        headers: hdr,
        observe: 'response',
      })
      .pipe(catchError(this.handleError));
  }
  // Save Resume
  applyJobCareer(data: any): Observable<any> {
    let API_URL = `${this.apiEndPoint}`;
    let hdr = new HttpHeaders()
      //  .set('content-type','application/json')
      .set('csn-auth-token', localStorage.getItem('userToken') || '{}');
    return this.http
      .post(API_URL + 'applyjob', data, {
        headers: hdr,
        observe: 'response',
      })
      .pipe(catchError(this.handleError));
  }

  continuetoapplyjob(data: any): Observable<any> {
    let API_URL = `${this.apiEndPoint}`;
    let hdr = new HttpHeaders()
      // .set('content-type', 'application/json')
      .set('csn-auth-token', localStorage.getItem('userToken') || 'null');
    return this.http
      .post(API_URL + 'continuetoapplyjob', data, { headers: hdr })
      .pipe(catchError(this.handleError));
  }

  // Save Resume
  applyasguestresumeupload(data: any): Observable<any> {
    let API_URL = `${this.apiEndPoint}`;
    let hdr = new HttpHeaders()
      //  .set('content-type','application/json')
      .set('csn-auth-token', localStorage.getItem('userToken') || '{}');
    return this.http
      .post(API_URL + 'applyasguestresumeupload', data, { headers: hdr })
      .pipe(catchError(this.handleError));
  }

  // Save Resume
  resumeupload(data: any): Observable<any> {
    let API_URL = `${this.apiEndPoint}`;
    let hdr = new HttpHeaders()
      //  .set('content-type','application/json')
      .set('csn-auth-token', localStorage.getItem('userToken') || '{}');
    return this.http
      .post(API_URL + 'resumeupload', data, { headers: hdr })
      .pipe(catchError(this.handleError));
  }
  // Save Image
  // http://localhost:8081/IncredibleMe/uploadprofilepic
  imageUpload(data: any): Observable<any> {
    let API_URL = `${this.apiEndPoint}`;
    let hdr = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('csn-auth-token', localStorage.getItem('userToken') || '{}');
    return this.http
      .post(API_URL + 'uploadprofilepic', data, { headers: hdr })
      .pipe(catchError(this.handleError));
  }
  //get Image 64
  // getImagebase64() {
  //   let API_URL = `${this.apiEndPoint}`;
  //   let hdr = new HttpHeaders()
  //     .set('content-type', 'application/json')
  //     .set('csn-auth-token', (localStorage.getItem('userToken') || '{}'))
  //   return this.http.get(API_URL + 'categorylist', { 'headers': hdr })
  //     .pipe(
  //       catchError(this.handleError)
  //     )
  // }

  //save education
  saveorediteducationdetails(data: any): Observable<any> {
    let API_URL = `${this.apiEndPoint}`;
    let hdr = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('csn-auth-token', localStorage.getItem('userToken') || '{}');
    return this.http
      .post(API_URL + 'saveorediteducationdetails', data, { headers: hdr })
      .pipe(catchError(this.handleError));
  }

  saveoredittrainingdetails(data: any): Observable<any> {
    let API_URL = `${this.apiEndPoint}`;
    let hdr = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('csn-auth-token', localStorage.getItem('userToken') || '{}');
    return this.http
      .post(API_URL + 'saveoredittrainingdetails', data, { headers: hdr })
      .pipe(catchError(this.handleError));
  }

  saveoreditsociallinksdetails(data: any): Observable<any> {
    let API_URL = `${this.apiEndPoint}`;
    let hdr = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('csn-auth-token', localStorage.getItem('userToken') || '{}');
    return this.http
      .post(API_URL + 'saveoreditsociallinksdetails', data, { headers: hdr })
      .pipe(catchError(this.handleError));
  }

  saveoreditlanguagedetails(data: any): Observable<any> {
    let API_URL = `${this.apiEndPoint}`;
    let hdr = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('csn-auth-token', localStorage.getItem('userToken') || '{}');
    return this.http
      .post(API_URL + 'saveoreditlanguagedetails', data, { headers: hdr })
      .pipe(catchError(this.handleError));
  }

  saveoreditbasicinformation(data: any): Observable<any> {
    let API_URL = `${this.apiEndPoint}`;
    let hdr = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('csn-auth-token', localStorage.getItem('userToken') || '{}');
    return this.http
      .post(API_URL + 'saveoreditbasicinformation', data, { headers: hdr })
      .pipe(catchError(this.handleError));
  }

  apllyasgusetbasicinformation(data: any): Observable<any> {
    let API_URL = `${this.apiEndPoint}`;
    let hdr = new HttpHeaders().set('content-type', 'application/json');
    //.set('csn-auth-token', (localStorage.getItem('userToken') || '{}'))
    return this.http
      .post(API_URL + 'apllyasgusetbasicinformation', data, {
        headers: hdr,
        observe: 'response',
      })
      .pipe(catchError(this.handleError));
  }

  saveoreditcareersummary(data: any): Observable<any> {
    let API_URL = `${this.apiEndPoint}`;
    let hdr = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('csn-auth-token', localStorage.getItem('userToken') || '{}');
    return this.http
      .post(API_URL + 'saveoreditcareersummary', data, { headers: hdr })
      .pipe(catchError(this.handleError));
  }

  saveoreditcertifications(data: any): Observable<any> {
    let API_URL = `${this.apiEndPoint}`;
    let hdr = new HttpHeaders()
      // .set('content-type', 'application/json')
      .set('csn-auth-token', localStorage.getItem('userToken') || '{}');
    return this.http
      .post(API_URL + 'saveoreditcertifications', data, { headers: hdr })
      .pipe(catchError(this.handleError));
  }

  saveoreditskilldetails(data: any): Observable<any> {
    let API_URL = `${this.apiEndPoint}`;
    let hdr = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('csn-auth-token', localStorage.getItem('userToken') || '{}');
    return this.http
      .post(API_URL + 'saveoreditskilldetails', data, { headers: hdr })
      .pipe(catchError(this.handleError));
  }

  //deletemeploymentrecord

  deleteemploymentrecord(data: any): Observable<any> {
    let API_URL = `${this.apiEndPoint}`;
    let hdr = new HttpHeaders()
      //  .set('content-type','application/json')
      .set('csn-auth-token', localStorage.getItem('userToken') || '{}');
    return this.http
      .delete(API_URL + 'deleteemploymentrecord/' + data, { headers: hdr })
      .pipe(catchError(this.handleError));
  }

  deleteeducationrecord(data: any): Observable<any> {
    let API_URL = `${this.apiEndPoint}`;
    let hdr = new HttpHeaders()
      //  .set('content-type','application/json')
      .set('csn-auth-token', localStorage.getItem('userToken') || '{}');
    return this.http
      .delete(API_URL + 'deleteeducationrecord/' + data, { headers: hdr })
      .pipe(catchError(this.handleError));
  }

  deletetrainingrecord(data: any): Observable<any> {
    let API_URL = `${this.apiEndPoint}`;
    let hdr = new HttpHeaders()
      //  .set('content-type','application/json')
      .set('csn-auth-token', localStorage.getItem('userToken') || '{}');
    return this.http
      .delete(API_URL + 'deletetrainingrecord/' + data, { headers: hdr })
      .pipe(catchError(this.handleError));
  }

  deletesociallinkrecord(data: any): Observable<any> {
    let API_URL = `${this.apiEndPoint}`;
    let hdr = new HttpHeaders()
      //  .set('content-type','application/json')
      .set('csn-auth-token', localStorage.getItem('userToken') || '{}');
    return this.http
      .delete(API_URL + 'deletesociallinkrecord/' + data, { headers: hdr })
      .pipe(catchError(this.handleError));
  }

  deletelanguagerecord(data: any): Observable<any> {
    let API_URL = `${this.apiEndPoint}`;
    let hdr = new HttpHeaders()
      //  .set('content-type','application/json')
      .set('csn-auth-token', localStorage.getItem('userToken') || '{}');
    return this.http
      .delete(API_URL + 'deletelanguagerecord/' + data, { headers: hdr })
      .pipe(catchError(this.handleError));
  }

  deletecertificationrecord(data: any): Observable<any> {
    let API_URL = `${this.apiEndPoint}`;
    let hdr = new HttpHeaders()
      //  .set('content-type','application/json')
      .set('csn-auth-token', localStorage.getItem('userToken') || '{}');
    return this.http
      .delete(API_URL + 'deletecertificationrecord/' + data, { headers: hdr })
      .pipe(catchError(this.handleError));
  }

  deleteskillrecord(data: any): Observable<any> {
    let API_URL = `${this.apiEndPoint}`;
    let hdr = new HttpHeaders()
      //  .set('content-type','application/json')
      .set('csn-auth-token', localStorage.getItem('userToken') || '{}');
    return this.http
      .delete(API_URL + 'deleteskillrecord/' + data, { headers: hdr })
      .pipe(catchError(this.handleError));
  }

  //register
  login(data: any): Observable<any> {
    let API_URL = `${this.apiEndPoint}`;
    return this.http
      .post(API_URL + 'login', data, { observe: 'response' })
      .pipe(catchError(this.handleError));
  }
  //guest register
  guestSignup(data: any): Observable<any> {
    let API_URL = `${this.apiEndPoint}`;
    return this.http
      .post(API_URL + 'signup', data, { observe: 'response' })
      .pipe(catchError(this.handleError));
  }

  contactus(data: any): Observable<any> {
    let API_URL = `${this.apiEndPoint}`;
    return this.http
      .post(API_URL + 'contactus', data, { observe: 'response' })
      .pipe(catchError(this.handleError));
  }

  forgotPassword(data: any): Observable<any> {
    let API_URL = `${this.apiEndPoint}`;
    return this.http
      .post(API_URL + 'forgotPassword', data)
      .pipe(catchError(this.handleError));
  }

  getResetPassword(data: any): Observable<any> {
    let API_URL = `${this.apiEndPoint}`;
    return this.http
      .post(API_URL + 'resetPassword', data, { observe: 'response' })
      .pipe(catchError(this.handleError));
  }

  // dahboard
  getRecommendedJobs(jobId: any) {
    console.log(localStorage.getItem('userToken'));
    let API_URL = `${this.apiEndPoint}`;
    let hdr = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('csn-auth-token', localStorage.getItem('userToken') || '{}');
    return this.http
      .get(
        API_URL +
        'getrecommendedjobs/' +
        localStorage.getItem('userId') +
        '/' +
        jobId,
        { headers: hdr }
      )
      .pipe(catchError(this.handleError));
  }

  // Jobs Search List
  getJobsSearchList(data: any): Observable<any> {
    let API_URL = `${this.apiEndPoint}`;
    let hdr = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('csn-auth-token', localStorage.getItem('userToken') || '{}');
    return this.http
      .post(API_URL + 'jobsearch', data, { headers: hdr })
      .pipe(catchError(this.handleError));
  }
  // http://35.155.228.233:8080/IncredibleMe/getjobs/2
  // get jobs

  autocomplete(data: any): Observable<any> {
    let API_URL = `${this.apiEndPoint}`;
    let hdr = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('api-key', 'eQqBEYsLw1jo697yM1Eb3kGF');
    return this.http
      .post(API_URL + 'autocomplete', data, { headers: hdr })
      .pipe(catchError(this.handleError));
  }

  jobsearch(data: any): Observable<any> {
    let API_URL = `${this.apiEndPoint}`;
    let hdr = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('csn-auth-token', localStorage.getItem('userToken') || '{}');
    return this.http
      .post(API_URL + 'jobsearch', data, { headers: hdr })
      .pipe(catchError(this.handleError));
  }
  getJobsApplied(): Observable<any> {
    let API_URL = `${this.apiEndPoint}`;
    let hdr = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('csn-auth-token', localStorage.getItem('userToken') || '{}');
    return this.http
      .get(API_URL + 'getjobs/' + localStorage.getItem('userId'), {
        headers: hdr,
      })
      .pipe(catchError(this.handleError));
  }
  getjobdetails(id: any): Observable<any> {
    let API_URL = `${this.apiEndPoint}`;
    let hdr = new HttpHeaders().set('content-type', 'application/json');
    return this.http
      .get(API_URL + 'getjobdetails/' + id, { headers: hdr })
      .pipe(catchError(this.handleError));
  }

  getcareerjobdetails(data: any): Observable<any> {
    let API_URL = `${this.apiEndPoint}`;
    let hdr = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('csn-auth-token', localStorage.getItem('userToken') || '{}');
    return this.http
      .post(API_URL + 'getjob', data, { headers: hdr })
      .pipe(catchError(this.handleError));
  }
  // Apply Job
  applyJob(data: any): Observable<any> {
    let API_URL = `${this.apiEndPoint}`;
    let hdr = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('csn-auth-token', localStorage.getItem('userToken') || 'null');
    return this.http
      .post(API_URL + 'applyjobs', data, { headers: hdr })
      .pipe(catchError(this.handleError));
  }

  // Apply Job
  getemailDetail(data: any): Observable<any> {
    let API_URL = `${this.apiEndPoint}`;
    let hdr = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('csn-auth-token', localStorage.getItem('userToken') || 'null');
    return this.http
      .post(API_URL + 'getdetails', data, { headers: hdr })
      .pipe(catchError(this.handleError));
  }

  // Apply otp
  SendVerificationCode(data: any): Observable<any> {
    let API_URL = `${this.apiEndPoint}`;
    let hdr = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('csn-auth-token', localStorage.getItem('userToken') || '{}');
    return this.http
      .post(API_URL + 'validatephonewithotp', data, { headers: hdr })
      .pipe(catchError(this.handleError));
  }

  // SendVerificationCode(data: any) {
  //     return true;
  // }

  // Apply Job
  unsubscribe(data: any): Observable<any> {
    let API_URL = `${this.apiEndPoint}`;
    let hdr = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('csn-auth-token', localStorage.getItem('userToken') || '{}');
    return this.http
      .post(API_URL + 'unsubscribe', data, { headers: hdr })
      .pipe(catchError(this.handleError));
  }
  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {

        resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
      },
        err => {
          reject(err);
        });
    });

  }

  // http://localhost:8081/IncredibleMe/profilePreview
  // http://localhost:8081/IncredibleMe/htmltosovern
  saveHtml(data: any, authToken: any): Observable<any> {
    let API_URL = `${this.apiEndPoint}`;
    let hdr = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('csn-auth-token', authToken);
    return this.http
      .post(API_URL + 'htmltosovern', data, { headers: hdr })
      .pipe(catchError(this.handleError));
  }

  // getPdf(pdfPath: string) {

  //   const httpOptions = {
  //     responseType: 'blob' as 'json',
  //     headers: new HttpHeaders({
  //       'content-type': 'application/json',
  //       'csn-auth-token': (localStorage.getItem('userToken') || '{}')
  //     })
  //   };

  //   return this.http.get('https://ova-qatest.s3.us-west-2.amazonaws.com/ova-pre-dev/Sevron/' + localStorage.getItem("userId") + '/' + pdfPath, httpOptions);
  // }

  // debounce API
  // const options = { method: 'GET', headers: { Accept: 'application/json' } };

  // fetch('https://api.debounce.io/v1/?email=aditya%40gmail.com', options)
  // .then(response => response.json())
  // .then(response => console.log(response))
  // .catch(err => console.error(err));

  validateEmail(email: string): Observable<any> {
    let hdr = new HttpHeaders().set('Accept', 'application/json');
    return this.http
      .get(
        'https://api.debounce.io/v1/?email=' +
        email +
        '&api=' +
        this.debounceApiKey,
        { headers: hdr }
      )
      .pipe(catchError(this.handleError));
  }

  // Update Employment Order
  saveEmpOrder(data: any): Observable<any> {
    let API_URL = `${this.apiEndPoint}`;
    let hdr = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('csn-auth-token', localStorage.getItem('userToken') || '{}');
    return this.http
      .post(API_URL + 'updateemporder', data, { headers: hdr })
      .pipe(catchError(this.handleError));
  }
  
  updatepassword(data: any): Observable<any> {
    let API_URL = `${this.apiEndPoint}`;
    let hdr = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('csn-auth-token', localStorage.getItem('userToken') || '{}');
    return this.http
      .post(API_URL + 'updatepassword', data, { headers: hdr })
      .pipe(catchError(this.handleError));
  }

  
  imageUrlToBase64(urL: string) {
    return this.http
      .get(urL, {
        observe: 'body',
        responseType: 'arraybuffer',
      })
      .pipe(
        take(1),
        map((arrayBuffer) =>
          btoa(
            Array.from(new Uint8Array(arrayBuffer))
              .map((b) => String.fromCharCode(b))
              .join('')
          )
        )
      );
  }

  getDateFormat(date: string) {
    if (date) {
      return new Date(date.replace(' ', 'T')).toISOString();
    } else {
      return date;
    }
  }

  setUserType(type: string): void {
    localStorage.setItem('userTypeToken', type);
  }

  getUserType(): string | null {
    return localStorage.getItem('userTypeToken');
  }

  setToken(token: string): void {
    localStorage.setItem('userToken', token);
  }
  setUserId(id: string): void {
    localStorage.setItem('userId', id);
  }

  getToken(): string | null {
    return localStorage.getItem('userToken');
  }

  getId(): string | null {
    return localStorage.getItem('userId');
  }
  isUserLoggedIn() {
    let userdata = this.getId() != null && this.getId() != 'undefined';
    return userdata ? userdata : '';
  }

  isUserLoggedIn1() {
    console.log(this.router.url);
    let userdata = '';
    let userId = this.getId() != null;
    let userType = this.getUserType();
    if (userType == 'true') {
      return userId ? userId : '';
    } else if (userType == 'false') {
      return '';
    } else {
      return userId ? userId : '';
    }
  }

  logout() {
    localStorage.removeItem('isUploadResumeStatus');
    localStorage.removeItem('userToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('locationfromCreateUploadResume');
    this.router.navigate(['find-jobs']);
    /************ */
    localStorage.removeItem('completedAssessments');
    localStorage.removeItem('totalAssessments');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('email');
    localStorage.removeItem('KeepmeSignedIn');
    localStorage.removeItem('emailFromProfile');
    localStorage.removeItem('source');
    localStorage.removeItem('jobNumber');
    localStorage.removeItem('profileId');
    /************************* */
    localStorage.removeItem('userTypeToken');
    localStorage.removeItem('isAlreadyOldUser');
    // localStorage.removeItem('jobData');
    localStorage.removeItem('source');
  }

  // Read
  list() {
    return this.http.get(`${this.apiEndPoint}`);
  }

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }

  getAssessments() {
    // console.log(localStorage.getItem('userToken'));
    let API_URL = `${this.apiEndPoint}`;
    let hdr = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('csn-auth-token', localStorage.getItem('userToken') || '{}');
    return this.http
      .get(API_URL + 'getassessments/' + localStorage.getItem('userId'), {
        headers: hdr,
      })
      .pipe(catchError(this.handleError));
  }
  // Save audio
  saveAudio(data: any): Observable<any> {
    return this.http
      .post('https://resume.accuick.com/Pipl/audio_text_file_save.jsp', data, {
        // 'headers': hdr,
        responseType: 'html' as 'json',
      })
      .pipe(
        map((success) => success),
        catchError(this.handleError)
      );
  }
  // Save audio
  // https://resume.accuick.com/recorder/audio_text_json_api.jsp?text="+URLEncoder.encode(text.trim())+"&filename="+filename
  getAudioJson(data: any): Observable<any> {
    return this.http
      .get('https://resume.accuick.com/Pipl/audio_text_json_api.jsp', {
        params: data,
        // 'headers': hdr,
        responseType: 'html' as 'json',
      })
      .pipe(
        map((success) => success),
        catchError(this.handleError)
      );
  }

  // save assessment score
  saveAssessmentScore(data: any): Observable<any> {
    let API_URL = `${this.apiEndPoint}`;
    let hdr = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('csn-auth-token', localStorage.getItem('userToken') || '{}');
    return this.http
      .post(API_URL + 'savecandidateassessmentscore', data, { headers: hdr })
      .pipe(catchError(this.handleError));
  }

  // save assessment
  saveAssessmentDatabase(data: any): Observable<any> {
    let API_URL = `${this.apiEndPoint}`;
    let hdr = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('csn-auth-token', localStorage.getItem('userToken') || '{}');
    return this.http
      .post(API_URL + 'savecandidateassessment', data, { headers: hdr })
      .pipe(catchError(this.handleError));
  }
  // save savecandidateassessmentscore
  savecandidateassessmentscore(data: any): Observable<any> {
    let API_URL = `${this.apiEndPoint}`;
    let hdr = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('csn-auth-token', localStorage.getItem('userToken') || '{}');
    return this.http
      .post(API_URL + 'savecandidateassessmentscore', data, { headers: hdr })
      .pipe(catchError(this.handleError));
  }

  smartystreet(
    street: string,
    apt: string,
    city: string,
    state: string,
    zip: string
  ): Observable<any> {
    let hdr = new HttpHeaders().set('content-type', 'application/json');
    // 1624 Peregrine Falcons Way, Orlando, FL 32837, USA
    let params = new HttpParams()
      .set('street', street)
      .set('street2', apt)
      .set('city', city)
      .set('state', state)
      .set('zipcode', zip)
      .set('key', environment.smartyKey);
    return this.http
      .get('https://us-street.api.smartystreets.com/street-address', {
        headers: hdr,
        params: params,
      })
      .pipe(catchError(this.handleError));
  }

  applyJobIsToken(id: any) {
    if (localStorage.getItem('userToken')) {
      //this.staticAuditLogAPI('154', '');
      // this.router.navigate(['/jobs'], { queryParams: {'jobId': id } });
      return true;
    } else {
      //this.logout();
      const pageUrl = JSON.parse(localStorage.getItem('jobData') || '{}');
      // console.log(pageUrl.job_url);
      this.router.navigate([pageUrl.job_url], { queryParams: { jobid: id } });
      return false;
    }
  }


  //checkVersion
  checkVersion(version: any) {
    // console.log(localStorage.getItem('userToken'));
    let API_URL = `${this.apiEndPoint}`;
    let hdr = new HttpHeaders()
      .set('content-type', 'application/json');
    return this.http
      .get(API_URL + 'checkVersion/' + version, {
        headers: hdr,
      })
      .pipe(catchError(this.handleError));
  }



  //htmltopdf
  htmltopdf(data: any, authToken: any): Observable<any> {
    let API_URL = `${this.apiEndPoint}`;
    let hdr = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('csn-auth-token', authToken);
    return this.http
      .post(API_URL + 'htmltopdf', data, { headers: hdr })
      .pipe(catchError(this.handleError));
  }

  getIpAddress() {
    // console.log(localStorage.getItem('userToken'));
    let API_URL = `${this.apiEndPoint}`;
    let hdr = new HttpHeaders()
      .set('content-type', 'application/json');
    return this.http
      .get('https://ipinfo.io/json?token=8f59664b32e94b')
      .pipe(catchError(this.handleError));
  }

  updatePassword(data: any): Observable<any> {
    let API_URL = `${this.apiEndPoint}`;
    let hdr = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('csn-auth-token', localStorage.getItem('userToken') || '{}');
    return this.http
      .post(API_URL + 'updatepassword', data, { headers: hdr })
      .pipe(catchError(this.handleError));
  }



}
