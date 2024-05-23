import { HttpClient, HttpHeaders } from '@angular/common/http';
import{ FormBuilder, FormGroup} from "@angular/forms"
import { GPTResponse } from './gpt-response';
import { DataService } from '../../services/data.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../../dialog/dialog.component';

@Component({
  selector: 'app-gpt',
  templateUrl: './gpt.component.html',
  styleUrl: './gpt.component.css'
})
export class GptComponent implements OnInit, AfterViewChecked {
  
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;public texteEtudeDeCas: string = '';
  queryFormGroup!: FormGroup;
  public messages: {role: string, content: string}[] = [];
  public chatMessages: { role: string, content: string }[] = [];
  firstCase: any;
  selectedTestResults: any = null;
  choice: any;
  data: string = '';
  exams:string = '';
  name: string = '';
  age: string = '';
  gender: string = '';
  height: string = '';
  weight: string = '';
  picture: string = '';
  xrayPicture: string = '';
  POCUS: string = '';
  Fluoroscopy: string = '';
  mriPicture: string = '';
  cardio: string = '';
  respiratory: string = '';
  cel: string = '';
  msk: string = '';
  neuro: string = '';
  
  CBC: string = '';
  CHEM7Electrolytes: string = '';
  CMP: string = '';
  LipidProfile: string = '';
  INR: string = '';
  ABG: string = '';
  Urinalysis: string = '';
  Markers: string = '';
  LPCSF: string = '';
  Endocrine: string = '';
  Cultures: string = '';
  ECG: string = '';
  PFTs: string = '';

  bigCc: string = '';
  smallCc: string = '';
  generalAppearance: string = '';
  showModal: boolean = false;
  selectedImage: string = '';
  selectedLab: string = '';
  showLab: boolean = false;

  constructor(private fb:FormBuilder, private httpClient : HttpClient, private dataService: DataService, public dialog: MatDialog){
  }

  ngOnInit(){
    this.queryFormGroup=this.fb.group({
      query : this.fb.control("")
    })
    
    this.dataService.getEtudesDeCas().subscribe(data => {
      const premiereEtude = data.etudesDeCas[0]; 
      this.texteEtudeDeCas = premiereEtude.texte; 
      
    });

    this.scrollToBottom();

    this.dataService.getEtudesDeCas().subscribe(data => {
      const firstCase = data.etudesDeCas[0];
      this.name = firstCase.name;
      this.age = firstCase.age;
      this.gender = firstCase.gender;
      this.height = firstCase.height;
      this.weight = firstCase.weight;
      this.picture = firstCase.picture;
      this.bigCc = firstCase.bigCc;
      this.generalAppearance = firstCase.generalAppearance;
      this.smallCc = firstCase.smallCc;
      this.xrayPicture = firstCase.xrayPicture;
      this.POCUS = firstCase.POCUS;
      this.Fluoroscopy = firstCase.Fluoroscopy;
      this.mriPicture = firstCase.mriPicture;
      this.cardio = firstCase.cardio;
      this.respiratory = firstCase.respiratory;
      this.cel = firstCase.cel;
      this.msk = firstCase.msk;
      this.neuro = firstCase.neuro;
      this.CBC = firstCase.CBC;
      this.CHEM7Electrolytes = firstCase.CHEM7Electrolytes;
      this.CMP = firstCase.CMP;
      this.LipidProfile = firstCase.LipidProfile;
      this.INR = firstCase.INR;
      this.ABG = firstCase.ABG;
      this.Urinalysis = firstCase.Urinalysis;
      this.Markers = firstCase.Markers;
      this.LPCSF = firstCase.LPCSF;
      this.Endocrine = firstCase.Endocrine;
      this.Cultures = firstCase.Cultures;
      this.ECG = firstCase.ECG;
      this.PFTs =firstCase.PFTs
      
    }, error => console.error('Erreur de chargement du fichier JSON:', error));
    
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  selectContent(dataTitle: string) {
    this.data = dataTitle;
  }

  selectExam(examTitle: string) {
    this.exams = examTitle;
  }

  toggleModal(imagePath?: string) {
    this.showModal = !this.showModal;
    this.selectedImage = imagePath ? imagePath : '';
  }

  toggleLab(lab?: string) {
    this.showLab = !this.showLab;
    this.selectedLab = lab ? lab : '';
  }

  showTests(testId: string) {
    this.selectedTestResults = this.firstCase ? this.firstCase[testId] : null;
    if (!this.selectedTestResults) {
      console.error(`No test results found for ${testId}`);
      return;
    }
    alert(this.selectedTestResults);
  }

  showLabResults(labResults: string) {
    this.dialog.open(DialogComponent, {
      data: {
        labResults: labResults
      }
    });
  }

  showTestResults(testResults: string) {
    this.dialog.open(DialogComponent, {
      data: {
        testResults: testResults
      }
    });
  }

  handleAskGPT() {
    let url="https://api.openai.com/v1/chat/completions"
    let httpHeaders=new HttpHeaders().set("Authorization","Bearer sk-proj-WRYHourvQehSmtN3V8zCT3BlbkFJC5qy73lPQyqQYh5ReScT")
    const requestContent = this.queryFormGroup.value.query;
    this.chatMessages.push({ role: "user", content: requestContent });
    this.messages.push(
      {
        "role": "system",
        "content": `Vous êtes le patient décrit dans le texte suivant: "${this.texteEtudeDeCas}" vous parlez au user qui est le docteur, vous devez jouer le jeux et ne jamais sortir de ce rôle de patient si tu n'a pas la réponse à la question dit simplement "je ne pense pas que cela aiderai ma situation actuel" ou "je ne sais pas" dépandement de si le user écrit n'importe quoi ou que simplement tu n'as pas la réponse. Aussi ne répond jamais comme un assitant ai reste dans le role de patient quoi qu'il arrive par cela je veux dire n'essaye pas d'aider le user c'est lui qui est supposer t'aider puisque tu est le patient et lui le docteur. Aussi tu ne pause jamais de question puique tu est le patient tu ne fait que répondre en fonction du texte qui t'a été fourni. Garde en tête que tu ne sais pas ton diagnostique et ne fait pas de supposition par rapport à celui-ci car tu est simplement un patient. Tu n'est pas obligé de resté dans le cardre du texte si il s'agit de question qui n'ont pas rapport avec l'étude de cas. Par exemple: si on te demande ton nom et que tu n'a pas de nom dans le texte tu peux inventer un nom et ce pour rendre l'interaction la plus reel. Je te dit cela pour que tu évite de répondre par "je ne sais pas" a une question dont un patient aurai évidement la réponse. Aussi ne parle pas du texte ou étude de cas qui t'as été assigné car tu dois faire comme si ca faisait parti de toi et que c,est ce que tu vie. N'essaye pas de m'aider ou de me servir tu est le patient donc ne dit pas ca. Ne dit pas "Bonjour, comment puis-je vous aider aujourd'hui ?" N'oublie pas il est primordiale de prendre un aspect humain afin que ca ai l'air réel ne mentionne jamais que tu puises tes informations d'un texte et ne dit jamais qu'une information n'est pas mentionné dans le texte au user. Si un info n'est pas mentionné dans le texte et qu'elle n'est pas de nature médicale tu peut l'inventé mais tout en t'assurant qu'elle reste cohérente vace les info de l'étude de cas. `
      },
      {
      role:"user", content:requestContent
      }
    )
    let payload = {
      model : "gpt-4",
      messages: this.messages,
    }
    this.httpClient.post<GPTResponse>(url,payload,{headers:httpHeaders}).subscribe({
      next :(resp)=>{
        const responseContent = resp.choices[0].message.content;
        this.chatMessages.push({ role: "system", content: responseContent });
        
      }, 
      error :(err)=>{
        
      }
    })
    this.queryFormGroup.reset();
  }
}
