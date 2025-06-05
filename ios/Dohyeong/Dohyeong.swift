//
//  Example.swift
//  Example
//
//  Created by 도형 on 2025/06/04.
//

import WidgetKit
import SwiftUI

public struct TodoModel:Codable {
  let id:Int, isCompleted: Bool, text: String;
}

struct Provider: TimelineProvider {
    // 위젯의 초기 상태를 나타내며 네트워크 요청시 요청이 완료되기 전까지 보여줄 기본 데이터를 설정
    func placeholder(in context: Context) -> SimpleEntry {
      SimpleEntry(date: Date(), todos:[])
    }

   // 미리보기 또는 빠른 업데이트를 위해 현재 데이터를 제공하며, 위젯을 추가하거나 설정에서 미리보기시에 호출되는 메서드
    func getSnapshot(in context: Context, completion: @escaping (SimpleEntry) -> ()) {
      let entry = SimpleEntry(date: Date(), todos:[])
        completion(entry)
    }

    // 일정 간격으로 데이터를 업데이트할 때를 포함한 타임라인을 제공하며, 
    // 여러 TimelineEntry를 포함한 Timeline 객체를 생성하여 반환해 주기적으로 위젯의 데이터를 업데이트하는 데 사용
    func getTimeline(in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
        // TimelineEntry 객체의 배열로 각 Entry는 특정 시간에 표시될 데이터와 시간을 포함
        var entries: [SimpleEntry] = []
      
        let userDefaults = UserDefaults(suiteName: "group.dohyeong.widget")
        let jsonText = userDefaults?.string(forKey: "data")
      
        var todos : [TodoModel] = []
        
        do {
          if jsonText != nil {
            let jsonData = Data(jsonText?.utf8 ?? "".utf8)
            let valueData = try JSONDecoder().decode([TodoModel].self, from: jsonData)
            
            todos = valueData
          }
        } catch {
          print(error)
        }

        // Generate a timeline consisting of five entries an hour apart, starting from the current date.
        let currentDate = Date()
        for hourOffset in 0 ..< 5 {
            let entryDate = Calendar.current.date(byAdding: .hour, value: hourOffset, to: currentDate)!
            let entry = SimpleEntry(date: entryDate, todos: todos)
            entries.append(entry)
        }

        let timeline = Timeline(entries: entries, policy: .atEnd)
        completion(timeline)
    }
}

struct SimpleEntry: TimelineEntry {
  let date: Date, todos: [TodoModel]
}

struct DohyeongEntryView : View {
    var entry: Provider.Entry
    @Environment(\.colorScheme) var colorScheme
    @Environment(\.widgetFamily) var family: WidgetFamily

    var body: some View {
        ZStack {
            (colorScheme == .dark ? Color(red: 51/255, green: 51/255, blue: 51/255) : Color.white)

            VStack(alignment: .leading, spacing: 8) {
                switch family {
                case .systemSmall:
                VStack(alignment: .leading, spacing: 4) {
                    Text("To-do")
                        .font(.caption)
                        .foregroundColor(.primary)

                    if entry.todos.isEmpty {
                        Text("No Task").font(.caption2).foregroundColor(.gray)
                    } else {
                        ForEach(entry.todos.prefix(3), id: \.id) { todo in
                            RowView(todo: todo)
                                .frame(maxWidth: .infinity, alignment: .leading)
                        }
                    }
                }
                

                case .systemMedium:
                    VStack(alignment: .leading, spacing: 3) {
                        Text("To-do List")
                            .font(.headline)
                            .foregroundColor(.primary)
                        if entry.todos.isEmpty {
                            Text("No tasks yet").foregroundColor(.gray)
                        } else {
                            ForEach(entry.todos.prefix(3), id: \.id) { todo in
                                RowView(todo: todo)
                            }
                        }
                    }

                case .systemLarge:
                    VStack(alignment: .leading, spacing: 6) {
                        Text("Today's Tasks")
                            .font(.headline)
                        if entry.todos.isEmpty {
                            Text("No tasks today").foregroundColor(.gray)
                        } else {
                            ForEach(entry.todos.prefix(6), id: \.id) { todo in
                                RowView(todo: todo)
                            }
                        }
                    }

                default:
                    EmptyView()
                }
            }
            .padding()
        }
        .applyWidgetBackground()
    }
}

//struct DohyeongEntryView : View {
//    var entry: Provider.Entry
//    @Environment(\.colorScheme) var colorScheme
//
//    var body: some View {
//      ZStack{
//        colorScheme == .dark ? Color(red:51/255, green: 51/255, blue: 51/255) : Color(red:1.0, green:1.0, blue: 1.0)
//        VStack(alignment: .leading){
//          if entry.todos.count > 0 {
//            VStack(alignment: .leading){
//              ForEach(entry.todos, id : \.self.id){ todo in
//                RowView(todo: todo)
//              }
//            }.frame(alignment: .leading)
//          }
//          else {
//            Text("Please Add Todo").font(.system(size:14)).foregroundColor(Color.gray)
//          }
//        }.padding()
//          .applyWidgetBackground()
//      }
//    }
//}

extension View {
    @ViewBuilder
    func applyWidgetBackground() -> some View {
        if #available(iOS 17.0, *) {
            self.containerBackground(for: .widget) {
                Color(.systemBackground)
            }
        } else {
            self.background(Color(.systemBackground))
        }
    }
}

struct Dohyeong: Widget {
    let kind: String = "Dohyeong"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: Provider()) { entry in
          
            DohyeongEntryView(entry: entry)
        }
        .configurationDisplayName("Dohyeong")
        .description("This is an dohyeong widget.").supportedFamilies([.systemSmall, .systemMedium])
    }
}



struct Dohyeong_Previews: PreviewProvider {
    static var previews: some View {
        DohyeongEntryView(entry: SimpleEntry(date: Date(), todos: []))
        .previewContext(WidgetPreviewContext(family: .systemMedium))
    }
}

struct RowView : View {
  let todo : TodoModel
  @Environment(\.colorScheme) var colorScheme
  var body: some View {
    HStack(alignment: .center){
      
      if todo.isCompleted {
        NetworkImage(url:URL(string:colorScheme == .dark ? "https://d246jgzr1jye8u.cloudfront.net/development/admin/1679407341788-0.png":"https://d246jgzr1jye8u.cloudfront.net/development/admin/1679287981894-0.png")).frame(width: 16, height:16)
        Text(todo.text).font(.system(size: 14)).foregroundColor(Color.gray).strikethrough(true).frame(width:140, alignment: .leading).lineLimit(1)
      }
      else {
        NetworkImage(url:URL(string:colorScheme == .dark ? "https://d246jgzr1jye8u.cloudfront.net/development/admin/1679407364726-0.png":"https://d246jgzr1jye8u.cloudfront.net/development/admin/1679287954386-0.png")).frame(width: 16, height:16)
        Text(todo.text).font(.system(size: 14)).foregroundColor(colorScheme == .dark ? Color(red:1.0, green: 1.0, blue: 1.0) : Color(red:0.0, green: 0.0, blue: 0.0)).frame(width:140,alignment: .leading).lineLimit(1)
      }
    }
    Spacer()
  }
}

struct NetworkImage: View {

  let url: URL?

  var body: some View {

    Group {
     if let url = url, let imageData = try? Data(contentsOf: url),
       let uiImage = UIImage(data: imageData) {

       Image(uiImage: uiImage)
         .resizable()
         .aspectRatio(contentMode: .fill)
      }
      else {
       Image("default_image")
      }
    }
  }

}
