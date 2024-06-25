import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importe CommonModule
import { Todo } from '../Models/todo.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule], // Adicione CommonModule aqui
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Corrija 'styleUrl' para 'styleUrls'
})
export class AppComponent {
  public todos: Todo[] = [];
  public form: FormGroup;
  public title: string = 'Minhas tarefas';
  public mode = 'list';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      ['title']: ['', 
        Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(60),
      ])]
    });

    this.carregarTodos();

    //this.todos.push(new Todo (1, 'Passerar com o cachorro', false));
    //this.todos.push(new Todo(2,'tirar o lixo', false));
    //this.todos.push(new Todo(3, 'ir ao mercado', true)); // Corrija 'hellow' para 'hello'
  }

  changeMode(mode: String) {
    this.mode = mode.toString();
  }

  add(){
    const title = this.form.controls['title'].value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id,title,false));
    this.save();
    this.clear();
  }

  clear(){
    this.form.reset();
  }

  save(){
    const data  = JSON.stringify(this.todos);
    localStorage.setItem('todos', data)
  }

  carregarTodos() {
    if (typeof window !== 'undefined') {
      // Agora você pode acessar o localStorage
      const data = localStorage.getItem('todos');
      // ...
      if (data) {
        try {
          this.todos = JSON.parse(data);
        } catch (error) {
          console.error("Erro ao converter a string JSON:", error);
        }
      }
    }
  }
  

  remove(todo: Todo){
    const index = this.todos.indexOf(todo);
    if (index !== -1){
      this.todos.splice(index,1);
    }
    this.save();
  }

  marquecomofeito(todo: Todo){
    todo.done = true;
    this.save();
  }

  marquecomodesfeito(todo: Todo){
    todo.done = false;
    this.save();
  }
}
