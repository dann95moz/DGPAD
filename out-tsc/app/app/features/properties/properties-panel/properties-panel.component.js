import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/dgpad-bridge/dgpad-bridge.service";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
function PropertiesPanelComponent_aside_0_span_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 9);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.state.code);
} }
function PropertiesPanelComponent_aside_0_section_8_button_10_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 19);
    i0.ɵɵlistener("click", function PropertiesPanelComponent_aside_0_section_8_button_10_Template_button_click_0_listener() { const color_r5 = i0.ɵɵrestoreView(_r4).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.updateGlobal("backgroundColor", color_r5)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const color_r5 = ctx.$implicit;
    const global_r6 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵstyleProp("background", color_r5);
    i0.ɵɵclassProp("active", global_r6.backgroundColor === color_r5);
    i0.ɵɵattribute("aria-label", color_r5);
} }
function PropertiesPanelComponent_aside_0_section_8_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 10)(1, "p", 11);
    i0.ɵɵtext(2, "Haz clic sobre un objeto o un eje para modificar sus propiedades.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h4");
    i0.ɵɵtext(4, "Propiedades globales");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "label", 12)(6, "span");
    i0.ɵɵtext(7, "Color de fondo");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "input", 13);
    i0.ɵɵlistener("input", function PropertiesPanelComponent_aside_0_section_8_Template_input_input_8_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.updateGlobal("backgroundColor", ctx_r1.textValue($event))); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 14);
    i0.ɵɵtemplate(10, PropertiesPanelComponent_aside_0_section_8_button_10_Template, 1, 5, "button", 15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "div", 16)(12, "label", 17)(13, "input", 18);
    i0.ɵɵlistener("change", function PropertiesPanelComponent_aside_0_section_8_Template_input_change_13_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.updateGlobal("presentationMode", ctx_r1.checkedValue($event))); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "span");
    i0.ɵɵtext(15, "Modo presentaci\u00F3n");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "label", 17)(17, "input", 18);
    i0.ɵɵlistener("change", function PropertiesPanelComponent_aside_0_section_8_Template_input_change_17_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.updateGlobal("magnifier", ctx_r1.checkedValue($event))); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "span");
    i0.ɵɵtext(19, "Mostrar la lupa");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "label", 17)(21, "input", 18);
    i0.ɵɵlistener("change", function PropertiesPanelComponent_aside_0_section_8_Template_input_change_21_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.updateGlobal("animation", ctx_r1.checkedValue($event))); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "span");
    i0.ɵɵtext(23, "Mostrar la animaci\u00F3n");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(24, "label", 17)(25, "input", 18);
    i0.ɵɵlistener("change", function PropertiesPanelComponent_aside_0_section_8_Template_input_change_25_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.updateGlobal("degrees", ctx_r1.checkedValue($event))); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "span");
    i0.ɵɵtext(27, "\u00C1ngulo en grados");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const global_r6 = ctx.ngIf;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(8);
    i0.ɵɵproperty("value", global_r6.backgroundColor);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r1.backgroundColors);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("checked", global_r6.presentationMode);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("checked", global_r6.magnifier);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("checked", global_r6.animation);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("checked", global_r6.degrees);
} }
function PropertiesPanelComponent_aside_0_p_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 20);
    i0.ɵɵtext(1, "DGPad todav\u00EDa se est\u00E1 iniciando.");
    i0.ɵɵelementEnd();
} }
function PropertiesPanelComponent_aside_0_section_10_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 21)(1, "h4");
    i0.ɵɵtext(2, "Propiedades cuadr\u00EDcula");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "label", 12)(4, "span");
    i0.ɵɵtext(5, "Color de ejes y cuadr\u00EDcula");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "input", 13);
    i0.ɵɵlistener("input", function PropertiesPanelComponent_aside_0_section_10_Template_input_input_6_listener($event) { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.updateAxis("color", ctx_r1.textValue($event))); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 22)(8, "label", 23)(9, "span");
    i0.ɵɵtext(10, "Fuente");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "input", 24);
    i0.ɵɵlistener("input", function PropertiesPanelComponent_aside_0_section_10_Template_input_input_11_listener($event) { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.updateAxis("fontSize", ctx_r1.numberValue($event))); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "output");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "label", 23)(15, "span");
    i0.ɵɵtext(16, "Tama\u00F1o ejes");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "input", 25);
    i0.ɵɵlistener("input", function PropertiesPanelComponent_aside_0_section_10_Template_input_input_17_listener($event) { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.updateAxis("axisWidth", ctx_r1.numberValue($event))); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "output");
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "label", 23)(21, "span");
    i0.ɵɵtext(22, "Tama\u00F1o cuadr\u00EDcula");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "input", 26);
    i0.ɵɵlistener("input", function PropertiesPanelComponent_aside_0_section_10_Template_input_input_23_listener($event) { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.updateAxis("gridWidth", ctx_r1.numberValue($event))); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "output");
    i0.ɵɵtext(25);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(26, "div", 27)(27, "label", 17)(28, "input", 18);
    i0.ɵɵlistener("change", function PropertiesPanelComponent_aside_0_section_10_Template_input_change_28_listener($event) { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.updateAxis("showGrid", ctx_r1.checkedValue($event))); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "span");
    i0.ɵɵtext(30, "Mostrar cuadr\u00EDcula");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(31, "label", 17)(32, "input", 18);
    i0.ɵɵlistener("change", function PropertiesPanelComponent_aside_0_section_10_Template_input_change_32_listener($event) { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.updateAxis("showOx", ctx_r1.checkedValue($event))); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "span");
    i0.ɵɵtext(34, "Mostrar el eje (Ox)");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(35, "label", 17)(36, "input", 18);
    i0.ɵɵlistener("change", function PropertiesPanelComponent_aside_0_section_10_Template_input_change_36_listener($event) { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.updateAxis("showOy", ctx_r1.checkedValue($event))); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "span");
    i0.ɵɵtext(38, "Mostrar el eje (Oy)");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(39, "label", 17)(40, "input", 18);
    i0.ɵɵlistener("change", function PropertiesPanelComponent_aside_0_section_10_Template_input_change_40_listener($event) { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.updateAxis("lockOx", ctx_r1.checkedValue($event))); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(41, "span");
    i0.ɵɵtext(42, "Bloquear el eje (Ox)");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(43, "label", 17)(44, "input", 18);
    i0.ɵɵlistener("change", function PropertiesPanelComponent_aside_0_section_10_Template_input_change_44_listener($event) { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.updateAxis("lockOy", ctx_r1.checkedValue($event))); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(45, "span");
    i0.ɵɵtext(46, "Bloquear el eje (Oy)");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(47, "label", 17)(48, "input", 18);
    i0.ɵɵlistener("change", function PropertiesPanelComponent_aside_0_section_10_Template_input_change_48_listener($event) { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.updateAxis("onlyPositive", ctx_r1.checkedValue($event))); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(49, "span");
    i0.ɵɵtext(50, "S\u00F3lo los positivos");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(51, "label", 17)(52, "input", 18);
    i0.ɵɵlistener("change", function PropertiesPanelComponent_aside_0_section_10_Template_input_change_52_listener($event) { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.updateAxis("centerZoom", ctx_r1.checkedValue($event))); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(53, "span");
    i0.ɵɵtext(54, "Zoom en el origen");
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    const axis_r8 = ctx.ngIf;
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("value", axis_r8.color);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("value", axis_r8.fontSize);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(axis_r8.fontSize);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("value", axis_r8.axisWidth);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(axis_r8.axisWidth);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("value", axis_r8.gridWidth);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(axis_r8.gridWidth);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("checked", axis_r8.showGrid);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("checked", axis_r8.showOx);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("checked", axis_r8.showOy);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("checked", axis_r8.lockOx);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("checked", axis_r8.lockOy);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("checked", axis_r8.onlyPositive);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("checked", axis_r8.centerZoom);
} }
function PropertiesPanelComponent_aside_0_ng_container_11_div_1_div_11_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 45)(1, "button", 46);
    i0.ɵɵlistener("click", function PropertiesPanelComponent_aside_0_ng_container_11_div_1_div_11_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r10); const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.update("shape", 0)); });
    i0.ɵɵtext(2, "\u25CF");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 47);
    i0.ɵɵlistener("click", function PropertiesPanelComponent_aside_0_ng_container_11_div_1_div_11_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r10); const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.update("shape", 1)); });
    i0.ɵɵtext(4, "\u00D7");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 48);
    i0.ɵɵlistener("click", function PropertiesPanelComponent_aside_0_ng_container_11_div_1_div_11_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r10); const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.update("shape", 2)); });
    i0.ɵɵtext(6, "\u25C6");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "button", 49);
    i0.ɵɵlistener("click", function PropertiesPanelComponent_aside_0_ng_container_11_div_1_div_11_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r10); const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.update("shape", 3)); });
    i0.ɵɵtext(8, "\u25A0");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const object_r11 = i0.ɵɵnextContext(2).ngIf;
    i0.ɵɵadvance();
    i0.ɵɵclassProp("active", object_r11.shape === 0);
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("active", object_r11.shape === 1);
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("active", object_r11.shape === 2);
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("active", object_r11.shape === 3);
} }
function PropertiesPanelComponent_aside_0_ng_container_11_div_1_option_40_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 50);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const precision_r12 = ctx.$implicit;
    i0.ɵɵproperty("value", precision_r12);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", precision_r12 === -1 ? "Sin" : precision_r12, " ");
} }
function PropertiesPanelComponent_aside_0_ng_container_11_div_1_label_41_option_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 50);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const increment_r14 = ctx.$implicit;
    i0.ɵɵproperty("value", increment_r14);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", increment_r14 === 0 ? "Libre" : increment_r14, " ");
} }
function PropertiesPanelComponent_aside_0_ng_container_11_div_1_label_41_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label", 38)(1, "span");
    i0.ɵɵtext(2, "Incremento");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "select", 39);
    i0.ɵɵlistener("change", function PropertiesPanelComponent_aside_0_ng_container_11_div_1_label_41_Template_select_change_3_listener($event) { i0.ɵɵrestoreView(_r13); const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.update("increment", ctx_r1.numberValue($event))); });
    i0.ɵɵtemplate(4, PropertiesPanelComponent_aside_0_ng_container_11_div_1_label_41_option_4_Template, 2, 2, "option", 40);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const object_r11 = i0.ɵɵnextContext(2).ngIf;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("value", object_r11.increment);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.incrementOptions);
} }
function PropertiesPanelComponent_aside_0_ng_container_11_div_1_label_43_Template(rf, ctx) { if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label", 17)(1, "input", 18);
    i0.ɵɵlistener("change", function PropertiesPanelComponent_aside_0_ng_container_11_div_1_label_43_Template_input_change_1_listener($event) { i0.ɵɵrestoreView(_r15); const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.update("angle360", ctx_r1.checkedValue($event))); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "360\u00B0");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const object_r11 = i0.ɵɵnextContext(2).ngIf;
    i0.ɵɵadvance();
    i0.ɵɵproperty("checked", object_r11.angle360);
} }
function PropertiesPanelComponent_aside_0_ng_container_11_div_1_label_56_Template(rf, ctx) { if (rf & 1) {
    const _r16 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label", 17)(1, "input", 18);
    i0.ɵɵlistener("change", function PropertiesPanelComponent_aside_0_ng_container_11_div_1_label_56_Template_input_change_1_listener($event) { i0.ɵɵrestoreView(_r16); const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.update("exclusive", ctx_r1.checkedValue($event))); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "Exclusivo");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const object_r11 = i0.ɵɵnextContext(2).ngIf;
    i0.ɵɵadvance();
    i0.ɵɵproperty("checked", object_r11.exclusive);
} }
function PropertiesPanelComponent_aside_0_ng_container_11_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 29)(1, "div", 30)(2, "input", 31);
    i0.ɵɵlistener("change", function PropertiesPanelComponent_aside_0_ng_container_11_div_1_Template_input_change_2_listener($event) { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.update("name", ctx_r1.textValue($event))); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "label", 32)(4, "input", 18);
    i0.ɵɵlistener("change", function PropertiesPanelComponent_aside_0_ng_container_11_div_1_Template_input_change_4_listener($event) { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.update("showName", ctx_r1.checkedValue($event))); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span");
    i0.ɵɵtext(6, "Mostrar");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(7, "label", 33)(8, "span");
    i0.ɵɵtext(9, "Color");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "input", 13);
    i0.ɵɵlistener("input", function PropertiesPanelComponent_aside_0_ng_container_11_div_1_Template_input_input_10_listener($event) { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.update("color", ctx_r1.textValue($event))); });
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(11, PropertiesPanelComponent_aside_0_ng_container_11_div_1_div_11_Template, 9, 8, "div", 34);
    i0.ɵɵelementStart(12, "label", 23)(13, "span");
    i0.ɵɵtext(14, "Tama\u00F1o");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "input", 35);
    i0.ɵɵlistener("input", function PropertiesPanelComponent_aside_0_ng_container_11_div_1_Template_input_input_15_listener($event) { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.update("size", ctx_r1.numberValue($event))); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "output");
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "label", 23)(19, "span");
    i0.ɵɵtext(20, "Opacidad");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "input", 36);
    i0.ɵɵlistener("input", function PropertiesPanelComponent_aside_0_ng_container_11_div_1_Template_input_input_21_listener($event) { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.update("opacity", ctx_r1.numberValue($event))); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "output");
    i0.ɵɵtext(23);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(24, "label", 23)(25, "span");
    i0.ɵɵtext(26, "Capa");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "input", 37);
    i0.ɵɵlistener("input", function PropertiesPanelComponent_aside_0_ng_container_11_div_1_Template_input_input_27_listener($event) { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.update("layer", ctx_r1.numberValue($event))); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "output");
    i0.ɵɵtext(29);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(30, "label", 23)(31, "span");
    i0.ɵɵtext(32, "Fuente");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "input", 24);
    i0.ɵɵlistener("input", function PropertiesPanelComponent_aside_0_ng_container_11_div_1_Template_input_input_33_listener($event) { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.update("fontSize", ctx_r1.numberValue($event))); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "output");
    i0.ɵɵtext(35);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(36, "label", 38)(37, "span");
    i0.ɵɵtext(38, "Medida");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "select", 39);
    i0.ɵɵlistener("change", function PropertiesPanelComponent_aside_0_ng_container_11_div_1_Template_select_change_39_listener($event) { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.update("precision", ctx_r1.numberValue($event))); });
    i0.ɵɵtemplate(40, PropertiesPanelComponent_aside_0_ng_container_11_div_1_option_40_Template, 2, 2, "option", 40);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(41, PropertiesPanelComponent_aside_0_ng_container_11_div_1_label_41_Template, 5, 2, "label", 41);
    i0.ɵɵelementStart(42, "div", 27);
    i0.ɵɵtemplate(43, PropertiesPanelComponent_aside_0_ng_container_11_div_1_label_43_Template, 4, 1, "label", 42);
    i0.ɵɵelementStart(44, "label", 17)(45, "input", 18);
    i0.ɵɵlistener("change", function PropertiesPanelComponent_aside_0_ng_container_11_div_1_Template_input_change_45_listener($event) { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.update("dash", ctx_r1.checkedValue($event))); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(46, "span");
    i0.ɵɵtext(47, "Punteado");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(48, "label", 17)(49, "input", 18);
    i0.ɵɵlistener("change", function PropertiesPanelComponent_aside_0_ng_container_11_div_1_Template_input_change_49_listener($event) { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.update("noMouse", ctx_r1.checkedValue($event))); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(50, "span");
    i0.ɵɵtext(51, "Objeto inerte");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(52, "label", 17)(53, "input", 18);
    i0.ɵɵlistener("change", function PropertiesPanelComponent_aside_0_ng_container_11_div_1_Template_input_change_53_listener($event) { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.update("track", ctx_r1.checkedValue($event))); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(54, "span");
    i0.ɵɵtext(55, "Activar la traza");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(56, PropertiesPanelComponent_aside_0_ng_container_11_div_1_label_56_Template, 4, 1, "label", 42);
    i0.ɵɵelementStart(57, "label", 43)(58, "input", 44);
    i0.ɵɵtwoWayListener("ngModelChange", function PropertiesPanelComponent_aside_0_ng_container_11_div_1_Template_input_ngModelChange_58_listener($event) { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(3); i0.ɵɵtwoWayBindingSet(ctx_r1.applyAll, $event) || (ctx_r1.applyAll = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(59, "span");
    i0.ɵɵtext(60);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const object_r11 = i0.ɵɵnextContext().ngIf;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("value", object_r11.name);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("checked", object_r11.showName);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("value", object_r11.color);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", object_r11.family === "point");
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("value", object_r11.size);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(object_r11.size);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("value", object_r11.opacity);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(object_r11.opacity);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("value", object_r11.layer);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(object_r11.layer);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("value", object_r11.fontSize);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(object_r11.fontSize);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("value", object_r11.precision);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.precisionOptions);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", object_r11.code !== "angle");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", object_r11.code === "angle");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("checked", object_r11.dash);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("checked", object_r11.noMouse);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("checked", object_r11.track);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", object_r11.supportsExclusive);
    i0.ɵɵadvance(2);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.applyAll);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Aplicar a todos: ", ctx_r1.familyLabel(object_r11.family), "");
} }
function PropertiesPanelComponent_aside_0_ng_container_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, PropertiesPanelComponent_aside_0_ng_container_11_div_1_Template, 61, 22, "div", 28);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.axisSelected);
} }
function PropertiesPanelComponent_aside_0_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "aside", 1)(1, "header", 2)(2, "div")(3, "h3");
    i0.ɵɵtext(4, "Propiedades");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, PropertiesPanelComponent_aside_0_span_5_Template, 2, 1, "span", 3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "button", 4);
    i0.ɵɵlistener("click", function PropertiesPanelComponent_aside_0_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.close()); });
    i0.ɵɵtext(7, "\u00D7");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(8, PropertiesPanelComponent_aside_0_section_8_Template, 28, 6, "section", 5)(9, PropertiesPanelComponent_aside_0_p_9_Template, 2, 0, "p", 6)(10, PropertiesPanelComponent_aside_0_section_10_Template, 55, 14, "section", 7)(11, PropertiesPanelComponent_aside_0_ng_container_11_Template, 2, 1, "ng-container", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngIf", ctx_r1.state);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", !ctx_r1.state && ctx_r1.globalState);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.state && !ctx_r1.globalState);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.axisSelected && ctx_r1.axisState);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.state);
} }
export class PropertiesPanelComponent {
    dgpadBridge;
    closed = new EventEmitter();
    visible = false;
    state = null;
    globalState = null;
    axisState = null;
    axisSelected = false;
    applyAll = false;
    precisionOptions = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    incrementOptions = [0, 0.001, 0.01, 0.1, 0.5, 1, 2, 5, 10, 100, 1000];
    backgroundColors = [
        '#0000b2',
        '#007c7c',
        '#006633',
        '#966400',
        '#770012',
        '#cc66cc',
        '#ffffff',
    ];
    constructor(dgpadBridge) {
        this.dgpadBridge = dgpadBridge;
    }
    open() {
        this.visible = true;
        this.applyAll = false;
        this.state = this.dgpadBridge.getPropertyState();
        this.globalState = this.dgpadBridge.getGlobalPropertyState();
        this.axisSelected = !!this.state?.code.startsWith('axis');
        this.axisState = this.axisSelected
            ? this.dgpadBridge.getAxisPropertyState()
            : null;
    }
    close() {
        this.visible = false;
        this.state = null;
        this.globalState = null;
        this.axisState = null;
        this.axisSelected = false;
        this.applyAll = false;
        this.closed.emit();
    }
    update(property, value) {
        this.dgpadBridge.updateProperty(property, value, this.applyAll);
        this.state = this.dgpadBridge.getPropertyState();
    }
    updateGlobal(property, value) {
        this.dgpadBridge.updateGlobalProperty(property, value);
        this.globalState = this.dgpadBridge.getGlobalPropertyState();
    }
    updateAxis(property, value) {
        this.dgpadBridge.updateAxisProperty(property, value);
        this.axisState = this.dgpadBridge.getAxisPropertyState();
    }
    numberValue(event) {
        return Number(event.target.value);
    }
    checkedValue(event) {
        return event.target.checked;
    }
    textValue(event) {
        return event.target.value;
    }
    familyLabel(family) {
        const labels = {
            point: 'Puntos',
            angle: 'Ángulos',
            line: 'Rectas',
            circle: 'Círculos',
        };
        return labels[family] ?? family;
    }
    handleLegacyMessage(event) {
        if (this.visible &&
            event.origin === window.location.origin &&
            event.data?.type === 'dgpad-property-selection') {
            this.applyAll = false;
            this.state = this.dgpadBridge.getPropertyState();
            this.axisSelected = !!this.state?.code.startsWith('axis');
            this.axisState = this.axisSelected
                ? this.dgpadBridge.getAxisPropertyState()
                : null;
        }
    }
    static ɵfac = function PropertiesPanelComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || PropertiesPanelComponent)(i0.ɵɵdirectiveInject(i1.DgpadBridgeService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PropertiesPanelComponent, selectors: [["app-properties-panel"]], hostBindings: function PropertiesPanelComponent_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("message", function PropertiesPanelComponent_message_HostBindingHandler($event) { return ctx.handleLegacyMessage($event); }, false, i0.ɵɵresolveWindow);
        } }, outputs: { closed: "closed" }, decls: 1, vars: 1, consts: [["class", "properties-panel", "aria-label", "Panel de propiedades", 4, "ngIf"], ["aria-label", "Panel de propiedades", 1, "properties-panel"], [1, "panel-header"], ["class", "object-type", 4, "ngIf"], ["type", "button", "aria-label", "Cerrar", 1, "close-button", 3, "click"], ["class", "global-properties", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], ["class", "axis-properties", 4, "ngIf"], [4, "ngIf"], [1, "object-type"], [1, "global-properties"], [1, "global-help"], [1, "global-color-control"], ["type", "color", 3, "input", "value"], ["aria-label", "Colores de fondo predefinidos", 1, "color-swatches"], ["type", "button", 3, "background", "active", "click", 4, "ngFor", "ngForOf"], [1, "checkboxes", "global-checkboxes"], [1, "checkbox-control"], ["type", "checkbox", 3, "change", "checked"], ["type", "button", 3, "click"], [1, "empty-state"], [1, "axis-properties"], [1, "controls", "axis-controls"], [1, "slider-control"], ["type", "range", "min", "6", "max", "60", "step", "1", 3, "input", "value"], ["type", "range", "min", "0.5", "max", "10", "step", "0.5", 3, "input", "value"], ["type", "range", "min", "0.1", "max", "2", "step", "0.1", 3, "input", "value"], [1, "checkboxes"], ["class", "controls", 4, "ngIf"], [1, "controls"], [1, "name-row"], ["type", "text", "aria-label", "Nombre", 3, "change", "value"], [1, "checkbox-control", "compact"], [1, "color-control"], ["class", "shape-picker", "aria-label", "Forma del punto", 4, "ngIf"], ["type", "range", "min", "0.5", "max", "25", "step", "0.5", 3, "input", "value"], ["type", "range", "min", "0", "max", "1", "step", "0.01", 3, "input", "value"], ["type", "range", "min", "-8", "max", "8", "step", "1", 3, "input", "value"], [1, "select-control"], [3, "change", "value"], [3, "value", 4, "ngFor", "ngForOf"], ["class", "select-control", 4, "ngIf"], ["class", "checkbox-control", 4, "ngIf"], [1, "checkbox-control", "apply-all"], ["type", "checkbox", 3, "ngModelChange", "ngModel"], ["aria-label", "Forma del punto", 1, "shape-picker"], ["type", "button", "title", "C\u00EDrculo", 3, "click"], ["type", "button", "title", "Cruz", 3, "click"], ["type", "button", "title", "Rombo", 3, "click"], ["type", "button", "title", "Cuadrado", 3, "click"], [3, "value"]], template: function PropertiesPanelComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, PropertiesPanelComponent_aside_0_Template, 12, 5, "aside", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.visible);
        } }, dependencies: [CommonModule, i2.NgForOf, i2.NgIf, FormsModule, i3.NgSelectOption, i3.ɵNgSelectMultipleOption, i3.CheckboxControlValueAccessor, i3.NgControlStatus, i3.NgModel], styles: [".properties-panel[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 16px;\n  right: 16px;\n  z-index: 40;\n  width: min(320px, calc(100vw - 32px));\n  max-height: calc(100vh - 96px);\n  overflow: auto;\n  border: 1px solid #c8cdd5;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.97);\n  box-shadow: 0 12px 32px rgba(17, 24, 39, 0.2);\n  color: #252525;\n  font-family: Arial, sans-serif;\n}\n\n.panel-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  padding: 14px 16px;\n  border-bottom: 1px solid #e1e4e8;\n}\n\n.panel-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 18px;\n}\n\n.object-type[_ngcontent-%COMP%] {\n  color: #667085;\n  font-size: 12px;\n}\n\n.close-button[_ngcontent-%COMP%] {\n  border: 0;\n  background: transparent;\n  color: #475467;\n  font-size: 24px;\n  cursor: pointer;\n}\n\n.empty-state[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 22px 16px;\n  color: #667085;\n  line-height: 1.45;\n}\n\n.controls[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 14px;\n  padding: 16px;\n}\n\n.controls[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]:not(.checkbox-control) {\n  display: grid;\n  gap: 7px;\n  font-size: 13px;\n  font-weight: 600;\n}\n\n.controls[_ngcontent-%COMP%]   input[type='text'][_ngcontent-%COMP%], \n.controls[_ngcontent-%COMP%]   input[type='number'][_ngcontent-%COMP%] {\n  min-width: 0;\n  padding: 8px 10px;\n  border: 1px solid #b8c0cc;\n  border-radius: 6px;\n}\n\n.controls[_ngcontent-%COMP%]   input[type='color'][_ngcontent-%COMP%] {\n  width: 100%;\n  height: 36px;\n  padding: 2px;\n  border: 1px solid #b8c0cc;\n  border-radius: 6px;\n  background: white;\n}\n\n.controls[_ngcontent-%COMP%]   input[type='range'][_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.checkbox-control[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 9px;\n  font-size: 14px;\n}\n\n.name-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr auto;\n  align-items: center;\n  gap: 12px;\n  padding: 8px;\n  border-radius: 10px;\n  background: #eef0f3;\n}\n\n.name-row[_ngcontent-%COMP%]   input[type='text'][_ngcontent-%COMP%] {\n  width: 100%;\n  box-sizing: border-box;\n  background: white;\n}\n\n.compact[_ngcontent-%COMP%] {\n  white-space: nowrap;\n}\n\n.color-control[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 64px 1fr;\n  align-items: center;\n  gap: 10px;\n}\n\n.shape-picker[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 8px;\n}\n\n.shape-picker[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  height: 36px;\n  border: 1px solid transparent;\n  border-radius: 7px;\n  background: #e6e8eb;\n  color: #70757d;\n  font-size: 22px;\n  cursor: pointer;\n}\n\n.shape-picker[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  border-color: #7e8794;\n  background: #cdd2d8;\n  color: #41464d;\n  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.18);\n}\n\n.slider-control[_ngcontent-%COMP%] {\n  display: grid !important;\n  grid-template-columns: 76px 1fr 34px;\n  align-items: center;\n  gap: 8px !important;\n}\n\n.slider-control[_ngcontent-%COMP%]   output[_ngcontent-%COMP%] {\n  text-align: right;\n  font-size: 12px;\n  font-weight: 400;\n}\n\n.select-control[_ngcontent-%COMP%] {\n  display: grid !important;\n  grid-template-columns: 76px 1fr;\n  align-items: center;\n  gap: 8px !important;\n}\n\n.select-control[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  min-width: 0;\n  padding: 6px 8px;\n  border: 1px solid #b8c0cc;\n  border-radius: 6px;\n  background: white;\n}\n\n.checkboxes[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 12px;\n  padding-top: 4px;\n}\n\n.apply-all[_ngcontent-%COMP%] {\n  margin-top: 2px;\n  padding-top: 12px;\n  border-top: 1px solid #e1e4e8;\n}\n\n.global-properties[_ngcontent-%COMP%] {\n  padding: 16px;\n}\n\n.global-help[_ngcontent-%COMP%] {\n  margin: 0 0 16px;\n  color: #525866;\n  font-size: 13px;\n  font-style: italic;\n  line-height: 1.35;\n  text-align: center;\n}\n\n.global-properties[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0 0 14px;\n  font-size: 17px;\n}\n\n.global-color-control[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 7px;\n  font-size: 13px;\n  font-weight: 600;\n}\n\n.global-color-control[_ngcontent-%COMP%]   input[type='color'][_ngcontent-%COMP%] {\n  width: 100%;\n  height: 112px;\n  padding: 2px;\n  border: 1px solid #b8c0cc;\n  border-radius: 8px;\n  background: white;\n}\n\n.color-swatches[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  margin: 8px 0 18px;\n}\n\n.color-swatches[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  height: 30px;\n  border: 1px solid #aeb4bc;\n  cursor: pointer;\n}\n\n.color-swatches[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  outline: 3px solid #4a90e2;\n  outline-offset: -4px;\n}\n\n.global-checkboxes[_ngcontent-%COMP%] {\n  gap: 14px;\n}\n\n.axis-properties[_ngcontent-%COMP%] {\n  padding: 16px;\n}\n\n.axis-properties[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0 0 14px;\n  text-align: center;\n  font-size: 16px;\n}\n\n.axis-controls[_ngcontent-%COMP%] {\n  padding: 16px 0 0;\n}\n\n.axis-controls[_ngcontent-%COMP%]   .slider-control[_ngcontent-%COMP%] {\n  grid-template-columns: 112px 1fr 34px;\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PropertiesPanelComponent, [{
        type: Component,
        args: [{ selector: 'app-properties-panel', imports: [CommonModule, FormsModule], template: "<aside *ngIf=\"visible\" class=\"properties-panel\" aria-label=\"Panel de propiedades\">\n  <header class=\"panel-header\">\n    <div>\n      <h3>Propiedades</h3>\n      <span *ngIf=\"state\" class=\"object-type\">{{ state.code }}</span>\n    </div>\n    <button type=\"button\" class=\"close-button\" (click)=\"close()\" aria-label=\"Cerrar\">\u00D7</button>\n  </header>\n\n  <section *ngIf=\"!state && globalState as global\" class=\"global-properties\">\n    <p class=\"global-help\">Haz clic sobre un objeto o un eje para modificar sus propiedades.</p>\n    <h4>Propiedades globales</h4>\n\n    <label class=\"global-color-control\">\n      <span>Color de fondo</span>\n      <input type=\"color\" [value]=\"global.backgroundColor\"\n        (input)=\"updateGlobal('backgroundColor', textValue($event))\" />\n    </label>\n\n    <div class=\"color-swatches\" aria-label=\"Colores de fondo predefinidos\">\n      <button *ngFor=\"let color of backgroundColors\" type=\"button\"\n        [style.background]=\"color\" [class.active]=\"global.backgroundColor === color\"\n        (click)=\"updateGlobal('backgroundColor', color)\" [attr.aria-label]=\"color\"></button>\n    </div>\n\n    <div class=\"checkboxes global-checkboxes\">\n      <label class=\"checkbox-control\">\n        <input type=\"checkbox\" [checked]=\"global.presentationMode\"\n          (change)=\"updateGlobal('presentationMode', checkedValue($event))\" />\n        <span>Modo presentaci\u00F3n</span>\n      </label>\n      <label class=\"checkbox-control\">\n        <input type=\"checkbox\" [checked]=\"global.magnifier\"\n          (change)=\"updateGlobal('magnifier', checkedValue($event))\" />\n        <span>Mostrar la lupa</span>\n      </label>\n      <label class=\"checkbox-control\">\n        <input type=\"checkbox\" [checked]=\"global.animation\"\n          (change)=\"updateGlobal('animation', checkedValue($event))\" />\n        <span>Mostrar la animaci\u00F3n</span>\n      </label>\n      <label class=\"checkbox-control\">\n        <input type=\"checkbox\" [checked]=\"global.degrees\"\n          (change)=\"updateGlobal('degrees', checkedValue($event))\" />\n        <span>\u00C1ngulo en grados</span>\n      </label>\n    </div>\n  </section>\n\n  <p *ngIf=\"!state && !globalState\" class=\"empty-state\">DGPad todav\u00EDa se est\u00E1 iniciando.</p>\n\n  <section *ngIf=\"axisSelected && axisState as axis\" class=\"axis-properties\">\n    <h4>Propiedades cuadr\u00EDcula</h4>\n\n    <label class=\"global-color-control\">\n      <span>Color de ejes y cuadr\u00EDcula</span>\n      <input type=\"color\" [value]=\"axis.color\"\n        (input)=\"updateAxis('color', textValue($event))\" />\n    </label>\n\n    <div class=\"controls axis-controls\">\n      <label class=\"slider-control\">\n        <span>Fuente</span>\n        <input type=\"range\" min=\"6\" max=\"60\" step=\"1\" [value]=\"axis.fontSize\"\n          (input)=\"updateAxis('fontSize', numberValue($event))\" />\n        <output>{{ axis.fontSize }}</output>\n      </label>\n      <label class=\"slider-control\">\n        <span>Tama\u00F1o ejes</span>\n        <input type=\"range\" min=\"0.5\" max=\"10\" step=\"0.5\" [value]=\"axis.axisWidth\"\n          (input)=\"updateAxis('axisWidth', numberValue($event))\" />\n        <output>{{ axis.axisWidth }}</output>\n      </label>\n      <label class=\"slider-control\">\n        <span>Tama\u00F1o cuadr\u00EDcula</span>\n        <input type=\"range\" min=\"0.1\" max=\"2\" step=\"0.1\" [value]=\"axis.gridWidth\"\n          (input)=\"updateAxis('gridWidth', numberValue($event))\" />\n        <output>{{ axis.gridWidth }}</output>\n      </label>\n\n      <div class=\"checkboxes\">\n        <label class=\"checkbox-control\"><input type=\"checkbox\" [checked]=\"axis.showGrid\"\n          (change)=\"updateAxis('showGrid', checkedValue($event))\" /><span>Mostrar cuadr\u00EDcula</span></label>\n        <label class=\"checkbox-control\"><input type=\"checkbox\" [checked]=\"axis.showOx\"\n          (change)=\"updateAxis('showOx', checkedValue($event))\" /><span>Mostrar el eje (Ox)</span></label>\n        <label class=\"checkbox-control\"><input type=\"checkbox\" [checked]=\"axis.showOy\"\n          (change)=\"updateAxis('showOy', checkedValue($event))\" /><span>Mostrar el eje (Oy)</span></label>\n        <label class=\"checkbox-control\"><input type=\"checkbox\" [checked]=\"axis.lockOx\"\n          (change)=\"updateAxis('lockOx', checkedValue($event))\" /><span>Bloquear el eje (Ox)</span></label>\n        <label class=\"checkbox-control\"><input type=\"checkbox\" [checked]=\"axis.lockOy\"\n          (change)=\"updateAxis('lockOy', checkedValue($event))\" /><span>Bloquear el eje (Oy)</span></label>\n        <label class=\"checkbox-control\"><input type=\"checkbox\" [checked]=\"axis.onlyPositive\"\n          (change)=\"updateAxis('onlyPositive', checkedValue($event))\" /><span>S\u00F3lo los positivos</span></label>\n        <label class=\"checkbox-control\"><input type=\"checkbox\" [checked]=\"axis.centerZoom\"\n          (change)=\"updateAxis('centerZoom', checkedValue($event))\" /><span>Zoom en el origen</span></label>\n      </div>\n    </div>\n  </section>\n\n  <ng-container *ngIf=\"state as object\">\n  <div *ngIf=\"!axisSelected\" class=\"controls\">\n    <div class=\"name-row\">\n      <input\n        type=\"text\"\n        aria-label=\"Nombre\"\n        [value]=\"object.name\"\n        (change)=\"update('name', textValue($event))\"\n      />\n      <label class=\"checkbox-control compact\">\n        <input\n          type=\"checkbox\"\n          [checked]=\"object.showName\"\n          (change)=\"update('showName', checkedValue($event))\"\n        />\n        <span>Mostrar</span>\n      </label>\n    </div>\n\n    <label class=\"color-control\">\n      <span>Color</span>\n      <input\n        type=\"color\"\n        [value]=\"object.color\"\n        (input)=\"update('color', textValue($event))\"\n      />\n    </label>\n\n    <div *ngIf=\"object.family === 'point'\" class=\"shape-picker\" aria-label=\"Forma del punto\">\n      <button type=\"button\" [class.active]=\"object.shape === 0\" (click)=\"update('shape', 0)\" title=\"C\u00EDrculo\">\u25CF</button>\n      <button type=\"button\" [class.active]=\"object.shape === 1\" (click)=\"update('shape', 1)\" title=\"Cruz\">\u00D7</button>\n      <button type=\"button\" [class.active]=\"object.shape === 2\" (click)=\"update('shape', 2)\" title=\"Rombo\">\u25C6</button>\n      <button type=\"button\" [class.active]=\"object.shape === 3\" (click)=\"update('shape', 3)\" title=\"Cuadrado\">\u25A0</button>\n    </div>\n\n    <label class=\"slider-control\">\n      <span>Tama\u00F1o</span>\n      <input type=\"range\" min=\"0.5\" max=\"25\" step=\"0.5\" [value]=\"object.size\"\n        (input)=\"update('size', numberValue($event))\" />\n      <output>{{ object.size }}</output>\n    </label>\n\n    <label class=\"slider-control\">\n      <span>Opacidad</span>\n      <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" [value]=\"object.opacity\"\n        (input)=\"update('opacity', numberValue($event))\" />\n      <output>{{ object.opacity }}</output>\n    </label>\n\n    <label class=\"slider-control\">\n      <span>Capa</span>\n      <input type=\"range\" min=\"-8\" max=\"8\" step=\"1\" [value]=\"object.layer\"\n        (input)=\"update('layer', numberValue($event))\" />\n      <output>{{ object.layer }}</output>\n    </label>\n\n    <label class=\"slider-control\">\n      <span>Fuente</span>\n      <input type=\"range\" min=\"6\" max=\"60\" step=\"1\" [value]=\"object.fontSize\"\n        (input)=\"update('fontSize', numberValue($event))\" />\n      <output>{{ object.fontSize }}</output>\n    </label>\n\n    <label class=\"select-control\">\n      <span>Medida</span>\n      <select [value]=\"object.precision\" (change)=\"update('precision', numberValue($event))\">\n        <option *ngFor=\"let precision of precisionOptions\" [value]=\"precision\">\n          {{ precision === -1 ? 'Sin' : precision }}\n        </option>\n      </select>\n    </label>\n\n    <label *ngIf=\"object.code !== 'angle'\" class=\"select-control\">\n      <span>Incremento</span>\n      <select [value]=\"object.increment\" (change)=\"update('increment', numberValue($event))\">\n        <option *ngFor=\"let increment of incrementOptions\" [value]=\"increment\">\n          {{ increment === 0 ? 'Libre' : increment }}\n        </option>\n      </select>\n    </label>\n\n    <div class=\"checkboxes\">\n      <label *ngIf=\"object.code === 'angle'\" class=\"checkbox-control\">\n        <input type=\"checkbox\" [checked]=\"object.angle360\"\n          (change)=\"update('angle360', checkedValue($event))\" />\n        <span>360\u00B0</span>\n      </label>\n\n      <label class=\"checkbox-control\">\n        <input type=\"checkbox\" [checked]=\"object.dash\"\n          (change)=\"update('dash', checkedValue($event))\" />\n        <span>Punteado</span>\n      </label>\n\n      <label class=\"checkbox-control\">\n        <input type=\"checkbox\" [checked]=\"object.noMouse\"\n          (change)=\"update('noMouse', checkedValue($event))\" />\n        <span>Objeto inerte</span>\n      </label>\n\n      <label class=\"checkbox-control\">\n        <input type=\"checkbox\" [checked]=\"object.track\"\n          (change)=\"update('track', checkedValue($event))\" />\n        <span>Activar la traza</span>\n      </label>\n\n      <label *ngIf=\"object.supportsExclusive\" class=\"checkbox-control\">\n        <input type=\"checkbox\" [checked]=\"object.exclusive\"\n          (change)=\"update('exclusive', checkedValue($event))\" />\n        <span>Exclusivo</span>\n      </label>\n\n      <label class=\"checkbox-control apply-all\">\n        <input type=\"checkbox\" [(ngModel)]=\"applyAll\" />\n        <span>Aplicar a todos: {{ familyLabel(object.family) }}</span>\n      </label>\n    </div>\n  </div>\n  </ng-container>\n</aside>\n", styles: [".properties-panel {\n  position: fixed;\n  top: 16px;\n  right: 16px;\n  z-index: 40;\n  width: min(320px, calc(100vw - 32px));\n  max-height: calc(100vh - 96px);\n  overflow: auto;\n  border: 1px solid #c8cdd5;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.97);\n  box-shadow: 0 12px 32px rgba(17, 24, 39, 0.2);\n  color: #252525;\n  font-family: Arial, sans-serif;\n}\n\n.panel-header {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  padding: 14px 16px;\n  border-bottom: 1px solid #e1e4e8;\n}\n\n.panel-header h3 {\n  margin: 0;\n  font-size: 18px;\n}\n\n.object-type {\n  color: #667085;\n  font-size: 12px;\n}\n\n.close-button {\n  border: 0;\n  background: transparent;\n  color: #475467;\n  font-size: 24px;\n  cursor: pointer;\n}\n\n.empty-state {\n  margin: 0;\n  padding: 22px 16px;\n  color: #667085;\n  line-height: 1.45;\n}\n\n.controls {\n  display: grid;\n  gap: 14px;\n  padding: 16px;\n}\n\n.controls label:not(.checkbox-control) {\n  display: grid;\n  gap: 7px;\n  font-size: 13px;\n  font-weight: 600;\n}\n\n.controls input[type='text'],\n.controls input[type='number'] {\n  min-width: 0;\n  padding: 8px 10px;\n  border: 1px solid #b8c0cc;\n  border-radius: 6px;\n}\n\n.controls input[type='color'] {\n  width: 100%;\n  height: 36px;\n  padding: 2px;\n  border: 1px solid #b8c0cc;\n  border-radius: 6px;\n  background: white;\n}\n\n.controls input[type='range'] {\n  width: 100%;\n}\n\n.checkbox-control {\n  display: flex;\n  align-items: center;\n  gap: 9px;\n  font-size: 14px;\n}\n\n.name-row {\n  display: grid;\n  grid-template-columns: 1fr auto;\n  align-items: center;\n  gap: 12px;\n  padding: 8px;\n  border-radius: 10px;\n  background: #eef0f3;\n}\n\n.name-row input[type='text'] {\n  width: 100%;\n  box-sizing: border-box;\n  background: white;\n}\n\n.compact {\n  white-space: nowrap;\n}\n\n.color-control {\n  display: grid;\n  grid-template-columns: 64px 1fr;\n  align-items: center;\n  gap: 10px;\n}\n\n.shape-picker {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 8px;\n}\n\n.shape-picker button {\n  height: 36px;\n  border: 1px solid transparent;\n  border-radius: 7px;\n  background: #e6e8eb;\n  color: #70757d;\n  font-size: 22px;\n  cursor: pointer;\n}\n\n.shape-picker button.active {\n  border-color: #7e8794;\n  background: #cdd2d8;\n  color: #41464d;\n  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.18);\n}\n\n.slider-control {\n  display: grid !important;\n  grid-template-columns: 76px 1fr 34px;\n  align-items: center;\n  gap: 8px !important;\n}\n\n.slider-control output {\n  text-align: right;\n  font-size: 12px;\n  font-weight: 400;\n}\n\n.select-control {\n  display: grid !important;\n  grid-template-columns: 76px 1fr;\n  align-items: center;\n  gap: 8px !important;\n}\n\n.select-control select {\n  min-width: 0;\n  padding: 6px 8px;\n  border: 1px solid #b8c0cc;\n  border-radius: 6px;\n  background: white;\n}\n\n.checkboxes {\n  display: grid;\n  gap: 12px;\n  padding-top: 4px;\n}\n\n.apply-all {\n  margin-top: 2px;\n  padding-top: 12px;\n  border-top: 1px solid #e1e4e8;\n}\n\n.global-properties {\n  padding: 16px;\n}\n\n.global-help {\n  margin: 0 0 16px;\n  color: #525866;\n  font-size: 13px;\n  font-style: italic;\n  line-height: 1.35;\n  text-align: center;\n}\n\n.global-properties h4 {\n  margin: 0 0 14px;\n  font-size: 17px;\n}\n\n.global-color-control {\n  display: grid;\n  gap: 7px;\n  font-size: 13px;\n  font-weight: 600;\n}\n\n.global-color-control input[type='color'] {\n  width: 100%;\n  height: 112px;\n  padding: 2px;\n  border: 1px solid #b8c0cc;\n  border-radius: 8px;\n  background: white;\n}\n\n.color-swatches {\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  margin: 8px 0 18px;\n}\n\n.color-swatches button {\n  height: 30px;\n  border: 1px solid #aeb4bc;\n  cursor: pointer;\n}\n\n.color-swatches button.active {\n  outline: 3px solid #4a90e2;\n  outline-offset: -4px;\n}\n\n.global-checkboxes {\n  gap: 14px;\n}\n\n.axis-properties {\n  padding: 16px;\n}\n\n.axis-properties h4 {\n  margin: 0 0 14px;\n  text-align: center;\n  font-size: 16px;\n}\n\n.axis-controls {\n  padding: 16px 0 0;\n}\n\n.axis-controls .slider-control {\n  grid-template-columns: 112px 1fr 34px;\n}\n"] }]
    }], () => [{ type: i1.DgpadBridgeService }], { closed: [{
            type: Output
        }], handleLegacyMessage: [{
            type: HostListener,
            args: ['window:message', ['$event']]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(PropertiesPanelComponent, { className: "PropertiesPanelComponent", filePath: "src/app/features/properties/properties-panel/properties-panel.component.ts", lineNumber: 20 }); })();
