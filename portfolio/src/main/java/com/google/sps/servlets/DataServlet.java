// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.servlets;
 
import java.util.List;
import com.google.gson.Gson;
import com.google.sps.data.Comment;
import java.sql.Timestamp;
import java.util.Date;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet that returns some example content. TODO: modify this file to handle comments data */
@WebServlet("/data")
public class DataServlet extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String commentsJson = new String();
    Query query = new Query("Comment").addSort("timestamp", SortDirection.DESCENDING);
    
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery results = datastore.prepare(query);
    
    //Builds list of Comment Objects
    List<Comment> comments = new ArrayList<>();
    for (Entity entity : results.asIterable()) {
      long id = entity.getKey().getId();
      String name = (String) entity.getProperty("name");
      long timestamp = (long) entity.getProperty("timestamp");
      String textInput = (String) entity.getProperty("comments");
      
      Comment c = new Comment(id, name, textInput, timestamp);
      comments.add(c);
    }
    //converts comments list to JSON
    commentsJson = new Gson().toJson(comments);
    System.out.println(commentsJson);

    response.setContentType("application/json");
    response.getWriter().println(commentsJson);
  }
  
  //Uses getParmeter function to obtain user input and inserts that input into  Entity for storage.
  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String name = getParameter(request, "name","");
    String text = getParameter(request, "text-input", "");
    long timestamp = System.currentTimeMillis();

    Entity taskEntity = new Entity("Comment");
    taskEntity.setProperty("name", name);
    taskEntity.setProperty("comments",text);
    taskEntity.setProperty("timestamp",timestamp);

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();    
    
    datastore.put(taskEntity);
    
    response.sendRedirect("/index.html");
  }
  /**
   * Obtains user input and returns the value of that input.
   * 
   * @returns The value of the input, or defaultValue if name does not exist.
   */
  public String getParameter(HttpServletRequest request, String name, String defaultValue) {
    String value = request.getParameter(name);
    if (value == null) {
      return defaultValue;
    }
    return value;
  }
}
