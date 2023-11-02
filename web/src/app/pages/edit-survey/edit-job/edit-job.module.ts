/**
 * Copyright 2023 The Ground Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {DragDropModule} from '@angular/cdk/drag-drop';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

import {LoiSelectionModule} from 'app/components/loi-selection/loi-selection.module';
import {AddTaskButtonModule} from 'app/pages/create-survey/task-details/add-task-button/add-task-button.module';
import {TaskInputModule} from 'app/pages/create-survey/task-details/task-input/task-input.module';
import {EditJobComponent} from 'app/pages/edit-survey/edit-job/edit-job.component';

@NgModule({
  declarations: [EditJobComponent],
  imports: [
    CommonModule,
    TaskInputModule,
    AddTaskButtonModule,
    DragDropModule,
    LoiSelectionModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [EditJobComponent],
})
export class EditJobModule {}
