using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Shapes;
using System.Windows.Browser;
using System.IO;
using System.Windows.Media.Imaging;
using System.Windows.Markup;
using System.Globalization;

namespace DropFile
{
    public partial class MainPage : UserControl
    {
        private string callback = "dropfile";

        public MainPage()
        {
            InitializeComponent();

            HtmlPage.RegisterScriptableObject("MainPage", this);

            // Register a handler for Rendering events
            // CompositionTarget.Rendering += new EventHandler(CompositionTarget_Rendering);

            // Register a handler for Drop events
            LayoutRoot.Drop += new DragEventHandler(LayoutRoot_Drop);
        }

        void LayoutRoot_Drop(object sender, DragEventArgs e)
        {
            List<string> dataList = new  List<string>();
            
            // Queue the FileInfo objects representing dropped files
            if (e.Data != null)
            {
                FileInfo[] files = e.Data.GetData(DataFormats.FileDrop) as FileInfo[];
                int count = 0;

                foreach (FileInfo fi in files)
                {
                    count++;
                    using (Stream stream = fi.OpenRead())
                    {
                        BinaryReader br = new BinaryReader(fi.OpenRead());

                        byte[] cool = br.ReadBytes((int)stream.Length);

                        // Add file and string meta data to the 
                        dataList.Add(fi.Name+","+Convert.ToBase64String(cool));
                    }
                }
                // Change the list to an Object which contains the arguments for our javascript function.
                object[] objs = new object[count]; for (int i = 0; i < count; i++) { objs[i] = dataList[i]; }

                // Call our javascript function
                HtmlPage.Window.Invoke(callback, objs);
            }
        }
        [ScriptableMember]
        public void Callback(string result)
        {
            callback = result;
        }
        [ScriptableMember]
        public void Color(string result)
        {
//            LayoutRoot.Background = result;
        }
    }
}
