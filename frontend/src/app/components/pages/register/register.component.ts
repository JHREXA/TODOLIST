/* Ce composant Angular RegisterComponent gère un formulaire d'enregistrement utilisateur avec des champs obligatoires et des validations personnalisées pour l'e-mail et la correspondance des mots de passe. Lors de la soumission, il envoie les données au service d'authentification pour enregistrement.

1 - Importations
2 - Définition du composant
3 - Classe 'RegisterComponent'
4 - Fonctions de Validation Personnalisée
5 - */

/* 1 - Importations */
// 'Component' : Module Angular pour définir les composants.
import { Component } from '@angular/core'; 
// 'AbstractControl, FormBuilder, FormGroup, Validators' : Modules d'Angular Forms pour créer et gérer les formulaires réactifs et leurs validations.
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
// 'AuthService' : Un service d'authentification importé pour gérer l'enregistrement des utilisateurs.
import { AuthService } from '../../../services/authService'; 

/* 2 - Définition du Composant */
@Component({
  // 'selector' : Le sélecteur HTML pour ce composant.
  selector: 'register',
  // 'templateUrl' : Le chemin vers le template HTML de ce composant.
  templateUrl: 'register.component.html',
  // 'styles' : Les styles CSS spécifiques à ce composant, ici définissant une classe .error avec une couleur de fond spécifique.
  styles: [`
    .error {
      background-color: #ff4081;
    }
  `]

})

/* 3 - Classe 'RegisterComponent' */
export class RegisterComponent {
    // 'form' : Une propriété qui contiendra le groupe de formulaires.
    form: any;

    /* 'constructor' : Le constructeur du composant. Il initialise le formulaire avec des champs et des validateurs :

        fb.group() : Utilisé pour créer un groupe de contrôles de formulaire.

        Chaque champ (nombre, apellidos, email, password, cpassword) est initialisé avec une valeur par défaut et des validateurs. Par exemple, Validators.required indique que le champ est obligatoire.
        
        Le formulaire a également une validation de groupe isntSame pour vérifier que password et cpassword sont identiques. */

    constructor(private fb: FormBuilder, private auth: AuthService){
        this.form = fb.group({
            nombre:['', Validators.required],
            apellidos:['', Validators.required],
            email:['', [Validators.required, validEmail()]],
            password:['', Validators.required],
            cpassword:['', Validators.required]
        }, {validator: isntSame('password', 'cpassword')});
    }
        // 'onSubmit()' : Méthode appelée lors de la soumission du formulaire. Elle affiche les erreurs du formulaire dans la console et appelle la méthode register du service d'authentification avec les valeurs du formulaire.
        onSubmit(){
            console.log(this.form.errors);
            this.auth.register(this.form.value);
        }

        // 'isValid()' : Méthode pour vérifier si un champ de formulaire est invalide et a été touché. Utile pour afficher des messages d'erreur ou des styles conditionnels.
        isValid(control: any): boolean{
            return this.form.controls[control].invalid && this.form.controls[control].touched;
        }
        
}

/* 4 - Fonctions de Validation Personnalisée */
// 'isntSame()' : Fonction de validation qui vérifie si les valeurs de 'field1' et 'field2' sont différentes. Si elles ne correspondent pas, elle retourne une erreur '{ isntSame: true }'. Si les valeurs sont égales, cette fonction retourne 'null'.
function isntSame(field1: string, field2: string) {
    return (form: AbstractControl) => {
        if (form instanceof FormGroup) {
            const control1 = form.get(field1);
            const control2 = form.get(field2);

            if (control1 && control2 && control1.value !== control2.value) {
                return { isntSame: true };
            }
        }
        return null;
    }
}

// validEmail : Fonction de validation qui vérifie si la valeur du contrôle respecte le format d'une adresse e-mail. Si la validation échoue, elle retourne { invalidEmail: true }. Dans le cas contraire, elle retourne 'null'.
function validEmail() {

    return (control: { value: any; }) => {
        let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    return regex.test(control.value) ? null : {invalidEmail: true}
    }
}