import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatgrupoPage } from './chatgrupo.page';

describe('ChatgrupoPage', () => {
  let component: ChatgrupoPage;
  let fixture: ComponentFixture<ChatgrupoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatgrupoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
