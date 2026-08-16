# Apple SwiftUI HIG Cheat Sheet & Idiomatic Patterns

## 1. Native SwiftUI Buttons

```swift
import SwiftUI

struct AppleButtonExamples: View {
    var body: some View {
        VStack(spacing: 16) {
            // 1. Prominent Filled Button
            Button(action: {}) {
                Text("Continue")
                    .frame(maxWidth: .infinity)
            }
            .buttonStyle(.borderedProminent)
            .controlSize(.large)
            .tint(.blue)
            
            // 2. Tinted / Bordered Button
            Button("Secondary Action", action: {})
                .buttonStyle(.bordered)
                .tint(.blue)
            
            // 3. Capsule Pill Button
            Button(action: {}) {
                Label("Add to Library", systemImage: "plus")
            }
            .buttonStyle(.borderedProminent)
            .clipShape(Capsule())
            
            // 4. Plain Navigation Action
            Button("Cancel", role: .cancel, action: {})
                .buttonStyle(.plain)
                .foregroundStyle(.blue)
        }
        .padding()
    }
}
```

---

## 2. Inset Grouped Settings List

```swift
struct AppleSettingsView: View {
    @State private var notificationsEnabled = true
    @State private var selectedTheme = "Automatic"

    var body: some View {
        NavigationStack {
            List {
                Section {
                    Toggle(isOn: $notificationsEnabled) {
                        Label {
                            Text("Notifications")
                        } icon: {
                            Image(systemName: "bell.badge.fill")
                                .foregroundStyle(.white)
                                .padding(6)
                                .background(Color.red, in: RoundedRectangle(cornerRadius: 7, style: .continuous))
                        }
                    }
                    
                    NavigationLink {
                        Text("Theme Selector")
                    } label: {
                        Label {
                            Text("Appearance")
                        } icon: {
                            Image(systemName: "circle.lefthalf.filled")
                                .foregroundStyle(.white)
                                .padding(6)
                                .background(Color.blue, in: RoundedRectangle(cornerRadius: 7, style: .continuous))
                        }
                    }
                } header: {
                    Text("General")
                } footer: {
                    Text("Customize your app notifications and appearance.")
                }
            }
            .listStyle(.insetGrouped)
            .navigationTitle("Settings")
        }
    }
}
```

---

## 3. Frosted Glass Material Card

```swift
struct AppleGlassCard: View {
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Apple Vision Pro")
                .font(.headline)
                .foregroundStyle(.secondary)
            
            Text("Spatial Computing Era")
                .font(.title2.weight(.bold))
                .foregroundStyle(.primary)
            
            Text("Welcome to the era of spatial computing, where digital content blends seamlessly with your physical space.")
                .font(.subheadline)
                .foregroundStyle(.secondary)
        }
        .padding(20)
        .background(.ultraThinMaterial, in: RoundedRectangle(cornerRadius: 20, style: .continuous))
        .overlay(
            RoundedRectangle(cornerRadius: 20, style: .continuous)
                .strokeBorder(Color.white.opacity(0.15), lineWidth: 1)
        )
        .shadow(color: Color.black.opacity(0.1), radius: 15, x: 0, y: 8)
    }
}
```

---

## 4. Modal Sheet with Detents

```swift
struct AppleSheetExample: View {
    @State private var isSheetPresented = false

    var body: some View {
        Button("Open Sheet") {
            isSheetPresented = true
        }
        .sheet(isPresented: $isSheetPresented) {
            VStack(spacing: 20) {
                Text("Details")
                    .font(.title3.bold())
                
                Text("Presented with smooth HIG spring motion.")
                    .font(.body)
                    .foregroundStyle(.secondary)
                
                Spacer()
            }
            .padding()
            .presentationDetents([.medium, .large])
            .presentationDragIndicator(.visible)
            .presentationCornerRadius(28)
        }
    }
}
```
